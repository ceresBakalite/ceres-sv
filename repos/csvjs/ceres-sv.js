/**
 * @license
 * ceres-sv v1.0.0
 *
 * Minified using terser v5.5.1
 * Original file: ceresbakalite/ceres-sv/repos/csvjs/ceres-sv.js
 *
 * ceresBakalite/ceres-sv is licensed under the MIT License - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2018 - 2020 Alexander Munro
*/
window.ceres = {};
(function()
{
    const rsc = {}; // generic resource methods
    (function() {

        this.clearElement = el => { while (el.firstChild) el.removeChild(el.firstChild); }
        this.fileName     = path => path.substring(path.lastIndexOf('/')+1, path.length);
        this.fileType     = (path, type) => path.substring(path.lastIndexOf('.')+1, path.length).toUpperCase() === type.toUpperCase();
        this.srcOpen      = obj => window.open(obj.element.getAttribute('src'), obj.type);
        this.isString     = obj => Object.prototype.toString.call(obj) == '[object String]';

        this.composeElement = (el, atr) => {

            if (!el.type) return;

            const precursor = ['LINK', 'SCRIPT', 'STYLE'].includes(el.type.trim().toUpperCase()) ? document.head : (el.parent || document.body);
            const node = document.createElement(el.type);

            Object.entries(atr).forEach(([key, value]) => { node.setAttribute(key, value); });
            if (el.markup) node.insertAdjacentHTML('afterbegin', el.markup);

            precursor.appendChild(node);
        }

        this.setSwipe = (touch, callback, args) => { // horizontal swipe

            if (!touch.act) touch.act = 80;

            touch.node.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; }, { passive: true });
            touch.node.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: true });
            touch.node.addEventListener('touchend', e =>
            {
                touch.end = e.changedTouches[0].screenX;

                if (Math.abs(touch.start - touch.end) > touch.act)
                {
                    args.action = (touch.start > touch.end);
                    callback.call(this, args);
                }

            }, { passive: true });

        }

        this.ignore = obj => {

            if (obj === null || obj == 'undefined') return true;

            if (this.isString(obj)) return (obj.length === 0 || !obj.trim());
            if (Array.isArray(obj)) return (obj.length === 0);
            if (obj && obj.constructor === Object) return (Object.keys(obj).length === 0);

            return !obj;
        }

        this.getBoolean = obj => {

            if (obj === true || obj === false) return atr;
            if (this.ignore(obj) || !this.isString(obj)) return false;

            return this.attrib.bool.includes(obj.trim().toUpperCase());
        }

        this.getUniqueId = obj => {

            if (!obj.name) obj.name = 'n';
            if (!obj.range) obj.range = 100;

            const elName = () => obj.name + Math.floor(Math.random() * obj.range);
            while (document.getElementById(obj.el = elName())) {};

            return obj.el;
        }

        this.removeDuplcates = (obj, sort) => {

            const key = JSON.stringify;
            const ar = [...new Map (obj.map(node => [key(node), node])).values()];

            return sort ? ar.sort((a, b) => a - b) : ar;
        }

        this.sanitizeText = (text, type = 'text/html') => {

            if (rsc.ignore(text)) return;
            return new DOMParser().parseFromString(text, type).documentElement.textContent.replace(/</g, '&lt;');
        }

        this.inspect = diagnostic => {

            const errorHandler = error => {

                const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
                console.error(err);

                if (error.alert) alert(err);
            }

            const lookup = {
                [this.attrib.notify]    : () => { if (diagnostic.logtrace) console.info(diagnostic.notification); },
                [this.attrib.warn]      : () => { if (diagnostic.logtrace) console.warn(diagnostic.notification); },
                [this.attrib.reference] : () => { if (diagnostic.logtrace) console.log('Reference: ' + this.attrib.newline + this.attrib.newline + diagnostic.reference); },
                [this.attrib.error]     : () => errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace }),
                [this.attrib.default]   : () => errorHandler({ notification: 'Unhandled exception' })
            };

            lookup[diagnostic.type]() || lookup[this.attrib.default];
        }

        this.getProperties = (string = {}, str = '') => {

            for (let literal in string) str += literal + ': ' + string[literal] + ', ';
            return str.replace(/, +$/g,'');
        }

        this.attrib = {

            reference : 1,
            notify    : 2,
            warn      : 3,
            default   : 98,
            error     : 99,
            bArray    : ['true', '1', 'enable', 'confirm', 'grant', 'active', 'on', 'yes'],
            isWindows : (navigator.appVersion.indexOf('Win') != -1),

            get newline() { return this.isWindows ? '\r\n' : '\n'; },
            get bool() { return this.bArray.map(item => { return item.trim().toUpperCase(); }) },
            get metaUrl() { return import.meta.url; }
        }

    }).call(rsc); // end resource allocation

    window,
    document,
    window.customElements.define('ceres-sv', class extends HTMLElement {

        async connectedCallback() {

            ceres.getImage = el => rsc.srcOpen({ element: el, type: 'image' }); // global scope method reference
            ceres.getSlide = el => atr.get.slide({ node: el }); // global scope method reference

            const csvRoot = this; // csv root node of a DOM subtree
            const cfg     = {}; // configuration attributes
            const atr     = {}; // attribute allocation

            configureAttributes();

            atr.setDisplay.hide();

            if (cfg.srcRoot) csvRoot.insertAdjacentHTML('afterbegin', atr.parseText( atr.getFileType( await ( await fetch(cfg.src) ).text() ) ));

            for (let item of cfg.cssRoot) { cfg.shadowStyle += rsc.sanitizeText( await ( await fetch(item) ).text() ); }

            if (atr.node.hasContent()) atr.node.showContent();

            function configureAttributes() {

                csvRoot.src = csvRoot.getAttribute('src');

                cfg.defaultCSS  = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.src         = rsc.ignore(csvRoot.src) ? null : csvRoot.src.trim();
                cfg.css         = csvRoot.getAttribute('css') || cfg.defaultCSS;
                cfg.srcRoot     = !rsc.ignore(cfg.src);
                cfg.cssRoot     = rsc.removeDuplcates(cfg.css.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';'));
                cfg.commaCodes  = /,|&comma;|&#x2c;|&#44;|U+0002C/g;
                cfg.commaSymbol = '_&c';
                cfg.shadowStyle = '';
                cfg.attrib      = {};
                cfg.slide       = 1;

                (function() {

                    const csv = csvRoot.tagName.toLocaleLowerCase();
                    const srm = new Map(); // shadowroot manager

                    const remark = {

                        markup     : 'Image list markup ',
                        element    : 'The element attributes ',
                        tagSearch  : 'The ' + csv + ' src attribute url is unavailable and there is no \'local\' elementId. Looking for the first occurance of a <template> or <noscript> tagname',
                        properties : 'Error: Unable to find the ' + csv + ' document element',
                        list       : 'Error: Unable to find either the ' + csv + ' document element nor the fallback local template elements',
                        template   : 'Error: Unable to find the local fallback template element when searching the document body',
                        cache      : 'Warning: cache response status '
                    };

                    Object.freeze(remark);

                    this.node = { // HTMLElement instance

                        hasContent: () => {

                            if (!atr.content.properties()) return rsc.inspect({ type: rsc.attrib.error, notification: remark.properties });
                            if (!atr.content.textList()) return rsc.inspect({ type: rsc.attrib.error, notification: remark.list });

                            return atr.content.textArray();
                        },

                        showContent: () => {

                            atr.get.shadow();
                            atr.get.slide({ shadow: cfg.shadow });
                            atr.get.view();
                        }

                    };

                    this.content = { // HTMLElement properties

                        properties: () => {

                            const propertyArray = ['nub', 'sub', 'sur', 'zoom', 'cache', 'trace', 'delay', 'local', 'fade', 'auto', 'loading'];
                            const styleArray = ['color', 'font', 'padding', 'top', 'bottom'];

                            const nodeProperty = {

                                nub     : atr => !rsc.getBoolean(atr),
                                fade    : atr => !rsc.getBoolean(atr),
                                cache   : atr => !rsc.getBoolean(atr),
                                zoom    : atr => !!rsc.ignore(atr) || rsc.getBoolean(atr),
                                trace   : atr => rsc.getBoolean(atr),
                                delay   : atr => Number.isInteger(parseInt(atr, 10)) ? parseInt(atr, 10) : 250,
                                loading : atr => rsc.ignore(atr) ? 'auto' : atr,
                                local   : atr => rsc.ignore(atr) ? false : atr // typeof boolean or typeof string
                            };

                            const getTemplate = () => {

                                if (cfg.srcRoot) return 'undefined';

                                let el = cfg.attrib.local ? document.getElementById(cfg.attrib.local) : null;

                                if (rsc.ignore(el)) {

                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.tagSearch, logtrace: cfg.attrib.trace });
                                    el = document.getElementsByTagName('template')[0] || document.getElementsByTagName('noscript')[0];
                                }

                                return rsc.ignore(el) ? 'undefined' : el;
                            }

                            const getCSVRootProperties = () => {

                                if (rsc.ignore(csvRoot)) return false;

                                csvRoot.id = rsc.getUniqueId({ name: csv, range: 1000 });

                                const getPropertyAttributes = propertyName => {

                                    const nodeAttribute = csvRoot.getAttribute(propertyName);
                                    if (rsc.ignore(nodeAttribute)) return false;

                                    const ar       = nodeAttribute.replace(/\s+:\s+/g,':').split(',');
                                    const atrArray = ar.map(item => { return item.trim(); });
                                    const regex    = propertyName != 'sur' ? /.subtitle[^&]*?}/i : /.surtitle[^&]*?}/i;
                                    const item     = atrArray[0];

                                    if (!Number.isInteger(parseInt(item)))
                                    {
                                        if (!rsc.getBoolean(item)) return false;
                                        if (atrArray.length > 1) atrArray.shift();
                                    }

                                    if (propertyName == 'auto')
                                    {
                                        cfg.attrib.autocycle  = Number.isInteger(parseInt(atrArray[0])) ? parseInt(atrArray[0]) : 10;
                                        cfg.attrib.autopause  = Number.isInteger(parseInt(atrArray[1])) ? parseInt(atrArray[1]) : 3000;
                                        cfg.attrib.autocancel = cfg.attrib.autocycle > -1;

                                        cfg.attrib.fade = cfg.attrib.autopause > 400;
                                        cfg.attrib.nub  = 'false'; // typeof string

                                        return true;
                                    }

                                    const getStyle = () => {

                                        if (atrArray.length == 0) return;

                                        const setStyleAttribute = attribute => {

                                            const re = Boolean(attribute.match(/color:/i)) ? /color[^&]*?;/i
                                                : Boolean(attribute.match(/font:/i)) ? /font[^&]*?;/i
                                                : Boolean(attribute.match(/padding:/i)) ? /padding[^&]*?;/i
                                                : Boolean(attribute.match(/top:/i)) ? /top[^&]*?;/i
                                                : Boolean(attribute.match(/bottom:/i)) ? /bottom[^&]*?;/i
                                                : null;

                                            if (!rsc.ignore(re))
                                            {
                                                const group = String(cfg.shadowStyle.match(regex));

                                                if (group)
                                                {
                                                    const newGroup = group.replace(re, attribute.replace(/(\s+)?:(\s+)?/g,':') + ';');
                                                    if (newGroup) cfg.shadowStyle = cfg.shadowStyle.replace(group, newGroup);
                                                }

                                            }

                                        }

                                        atrArray.forEach((attribute) => {

                                            if (styleArray.includes(attribute.split(':')[0])) setStyleAttribute(attribute);

                                        });

                                    }

                                    if (propertyArray.includes(propertyName)) getStyle();

                                    return true;
                                }

                                cfg.attrib.nub     = nodeProperty.nub(csvRoot.getAttribute('nub')); // enabled
                                cfg.attrib.fade    = nodeProperty.fade(csvRoot.getAttribute('fade')); // enabled
                                cfg.attrib.zoom    = nodeProperty.zoom(csvRoot.getAttribute('zoom')); // enabled
                                cfg.attrib.cache   = nodeProperty.cache(csvRoot.getAttribute('cache')); // enabled
                                cfg.attrib.trace   = nodeProperty.trace(csvRoot.getAttribute('trace')); // disabled
                                cfg.attrib.delay   = nodeProperty.delay(csvRoot.getAttribute('delay')); // default 250
                                cfg.attrib.loading = nodeProperty.loading(csvRoot.getAttribute('loading')); // enabled (default auto)
                                cfg.attrib.local   = nodeProperty.local(csvRoot.getAttribute('local')); // local image list template elementId
                                cfg.attrib.sur     = getPropertyAttributes('sur'); // disabled
                                cfg.attrib.sub     = getPropertyAttributes('sub'); // disabled
                                cfg.attrib.auto    = getPropertyAttributes('auto'); // disabled

                                Object.freeze(cfg.attrib);

                                cfg.template = getTemplate(); // local image list element

                                return true;
                            }

                            return getCSVRootProperties();
                        },

                        textList: () => (cfg.srcRoot || cfg.template),

                        textArray: () => {

                            cfg.imageArray = null;

                            rsc.inspect({ type: rsc.attrib.notify, notification: remark.element + '[' + csvRoot.id + '] ' + rsc.getProperties(cfg.attrib), logtrace: cfg.attrib.trace });

                            const getImageList = () => {

                                const shadowList = () => {

                                    const text = csvRoot.textContent;
                                    return !rsc.ignore(text) ? text : null;
                                }

                                const lightList = () => {

                                    const text = (cfg.template.tagName != 'TEMPLATE') ? cfg.template.textContent : cfg.template.content.textContent;
                                    if (rsc.ignore(text)) return rsc.inspect({ type: rsc.attrib.error, notification: remark.template + ' [' + cfg.attrib.local + ']' });

                                    return atr.parseText(text);
                                }

                                return cfg.srcRoot ? shadowList() : lightList();
                            }

                            const isImageArray = () => {

                                const imageList = getImageList();

                                if (!rsc.ignore(imageList))
                                {
                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.markup + '[' + (cfg.srcRoot ? csvRoot.id + ' - ' + rsc.fileName(cfg.src) : cfg.attrib.local + ' - template') + ']' + rsc.attrib.newline + imageList.replaceAll(cfg.commaSymbol, '&comma;'), logtrace: cfg.attrib.trace });
                                    cfg.imageArray = imageList ? imageList.trim().split('\n') : null;
                                }

                                return !rsc.ignore(cfg.imageArray);
                            }

                            return isImageArray();
                        }

                    };

                    this.get = { // HTMLElement components

                        shadow: () => {

                            const getSwipe = swipe => {

                                const offset = swipe.action ? swipe.right : swipe.left;
                                cfg.slide = cfg.slide += offset;

                                atr.get.slide({ shadow: cfg.shadow });
                            }

                            const shade = document.querySelector('#' + csvRoot.id);
                            rsc.clearElement(shade);

                            shade.attachShadow({ mode: 'open' });
                            cfg.shadow = shade.shadowRoot;

                            atr.compose.style();
                            atr.compose.body();

                            if (!cfg.attrib.auto) rsc.setSwipe({ node: cfg.shadow.querySelector('div.slideview-body > div.slideview-image') }, getSwipe, { left: -1, right: 1 });
                        },

                        slide: obj => {

                            const getShadow = node => { // shadowRoot slide manager

                                const root   = node.getRootNode().host;
                                const shade  = document.querySelector('#' + root.id);
                                const shadow = shade.shadowRoot;
                                const slide  = shadow.querySelector('div.slideview-image > div.active');

                                cfg.slide = Number.parseInt(slide.id.replace('img', ''), 10);

                                srm.set('left', cfg.slide - 1);
                                srm.set('right', cfg.slide + 1);
                                srm.set('nub', Number.parseInt(node.id.replace('nub', ''), 10));

                                cfg.slide = srm.get(node.className);

                                return shadow;
                            }

                            if (rsc.ignore(obj.shadow)) obj.shadow = rsc.ignore(obj.node) ? cfg.shadow : getShadow(obj.node);
                            const slides = obj.shadow.querySelectorAll('div.slideview-image > div.slide');

                            cfg.slide = !rsc.ignore(obj.autoslide) ? obj.autoslide
                                : cfg.slide < 1 ? slides.length
                                : cfg.slide > slides.length ? 1
                                : cfg.slide;

                            const next = cfg.slide-1;

                            if (rsc.ignore(slides[next])) return;

                            const active = obj.shadow.querySelector('div.slideview-image > div.active');
                            if (active) active.classList.replace('active', 'none');

                            slides[next].classList.replace('none', 'active');

                            const enabled = obj.shadow.querySelector('div.slideview-nub > span.enabled');
                            if (enabled) enabled.className = 'nub';

                            const nub = obj.shadow.querySelectorAll('div.slideview-nub > span.nub');
                            nub[next].className = 'nub enabled';
                        },

                        view: () => {

                            const getAuto = () => {

                                const slides = cfg.shadow.querySelectorAll('div.slideview-image > div.slide');
                                const complete = cfg.attrib.autocancel && cfg.attrib.autocycle > -1 ? cfg.imageArray.length * cfg.attrib.autocycle : 0;

                                let iteration = 0;
                                let autoslide = 1;

                                const autoCancel = () => {

                                    autoslide = autoslide < 1 ? slides.length
                                        : autoslide > slides.length ? 1
                                        : autoslide;

                                    if (!cfg.attrib.autocancel) return (autoslide++, false); // never stops
                                    return iteration === complete || (autoslide++, iteration++, false); // stops when complete
                                }

                                const auto = setInterval(function run() {

                                    if (autoCancel()) clearInterval(auto);
                                    atr.get.slide({ autoslide: autoslide-1 });

                                }, cfg.attrib.autopause);

                            }

                            const insertCache = () => { // cache a range of response.status values (200, 304 etc)

                                if (!('caches' in window)) return;

                                const src       = cfg.srcRoot ? cfg.src.split() : Array.from('');
                                const cacheName = csv + '-cache';
                                const urlArray  = rsc.removeDuplcates(src.concat(cfg.cssRoot.concat([ rsc.attrib.metaUrl ])));

                                urlArray.forEach(url => {

                                    fetch(url).then(response => {

                                        if (!response.ok) { rsc.inspect({ type: rsc.attrib.warn, notification: remark.cache + '[' + response.status + '] - ' + url, logtrace: cfg.attrib.trace }); }
                                        return caches.open(cacheName).then(cache => { return cache.put(url, response); });
                                    });

                                });

                            }

                            setTimeout(() => {

                                if (cfg.attrib.auto) setTimeout(() => { getAuto(); }, cfg.attrib.delay);
                                atr.setDisplay.show();

                            }, cfg.attrib.delay);

                            if (cfg.attrib.cache) insertCache();

                            rsc.inspect({ type: rsc.attrib.notify, notification: cfg.shadow, logtrace: cfg.attrib.trace });
                        }

                    };

                    this.compose = { // HTMLElement compose extension

                        style: () => {

                            const styleNode = document.createElement('style');
                            styleNode.className = 'slideview-style';
                            styleNode.insertAdjacentHTML('beforeend', cfg.shadowStyle);

                            cfg.shadow.appendChild(styleNode);
                        },

                        body: () => {

                            const setURL      = () => !rsc.ignore(ar[0]) ? ar[0].trim() : null;
                            const setLoading  = () => Boolean(cfg.attrib.loading.match(/lazy|eager|auto/i)) ? cfg.attrib.loading : 'auto';
                            const getSubtitle = () => cfg.attrib.sub ? setSubtitle() : null;
                            const getSurtitle = () => cfg.attrib.sur ? setSurtitle() : null;
                            const setSubtitle = () => rsc.ignore(ar[1]) ? null : ar[1].trim().replaceAll(cfg.commaSymbol, ',');
                            const setSurtitle = () => rsc.ignore(ar[2]) ? index + ' / ' + cfg.imageArray.length : ar[2].trim().replaceAll(cfg.commaSymbol, ',');

                            const classlist = atr.getClassList('slide');
                            const srcImage  = cfg.attrib.zoom ? 'ceres.getImage(this);' : 'javascript:void(0);'
                            const hrefSlide = 'ceres.getSlide(this)';

                            const bodyNode = document.createElement('div');
                            bodyNode.className = 'slideview-body';

                            const imgNode = document.createElement('div');
                            imgNode.className = 'slideview-image';

                            bodyNode.appendChild(imgNode);

                            const trackNode = document.createElement('div');
                            trackNode.className = atr.getClassList('slideview-nub');

                            bodyNode.appendChild(trackNode);

                            let index = 0;

                            for (let item in cfg.imageArray)
                            {
                                let ar = cfg.imageArray[item].split(',');

                                const slideNode = document.createElement('div');
                                slideNode.className = classlist;
                                slideNode.id = 'img' + (++index);

                                imgNode.appendChild(slideNode);

                                if (cfg.attrib.sur) rsc.composeElement({ type: 'div', parent: slideNode, markup: getSurtitle() }, { class: 'surtitle fade' });
                                rsc.composeElement({ type: 'img', parent: slideNode }, { class: 'slide', onclick: srcImage, src: setURL(), alt: setSubtitle(), loading: setLoading() });
                                if (cfg.attrib.sub) rsc.composeElement({ type: 'div', parent: slideNode, markup: getSubtitle() }, { class: 'subtitle fade' });
                            }

                            rsc.composeElement({ type: 'a', parent: imgNode, markup: '&#10094;' }, { class: atr.getClassList('left'), onclick: hrefSlide });
                            rsc.composeElement({ type: 'a', parent: imgNode, markup: '&#10095;' }, { class: atr.getClassList('right'), onclick: hrefSlide });

                            cfg.imageArray.forEach((item, i) =>
                            {
                                rsc.composeElement({ type: 'span', parent: trackNode }, { id: 'nub' + i, class: 'nub', onclick: hrefSlide });
                            });

                            cfg.shadow.appendChild(bodyNode);
                        }

                    };

                    this.setDisplay = {

                        hide: () => {

                            csvRoot.style.visibility = 'hidden';
                            csvRoot.style.display = 'none';
                        },

                        show: () => {

                            csvRoot.style.removeProperty('display');
                            csvRoot.style.removeProperty('visibility');

                            if (csvRoot.style.length === 0) csvRoot.removeAttribute('style');
                        }

                    };

                    this.getClassList = className => {

                        if (className != 'slide') return cfg.attrib.nub && cfg.attrib.auto ? className += ' none' : className;

                        if (cfg.attrib.zoom) className += ' zoom';
                        if (cfg.attrib.fade) className += ' fade';

                        return className += ' none';
                    }

                    this.getFileType = textList => {

                        if (rsc.fileType(cfg.src, 'json')) return atr.parseJSON(textList);
                        if (rsc.fileType(cfg.src, 'csv')) return atr.parseJSON( atr.parseCSV( textList, { json: true, nodes: ['url','sub','sur'] } ));

                        return textList;
                    }

                    this.parseText = text => { return rsc.sanitizeText(text.replace(/\\,|&comma;|&#x2c;|&#44;|U+0002C/g, cfg.commaSymbol).replace(/^\s*?<template(.*?)>|<\/template>\s*?$/, '')); }

                    this.parseJSON = text => {

                        const json = JSON.parse(text);
                        let str = '';

                        json.forEach((node) =>
                        {
                            str += node.url
                                + (node.sub ? ', ' + node.sub.replace(cfg.commaCodes, cfg.commaSymbol) : '')
                                + (node.sur ? ', ' + node.sur.replace(cfg.commaCodes, cfg.commaSymbol) : '')
                                + '\n';
                        });

                        return str;
                    }

                    // noddy regex csv parser
                    this.parseCSV = (text, symbol = {}) => {

                        const textArray = text.split('\n'); // this assumes incorrectly that line breaks only occur at the end of rows
                        const newArray  = new Array(textArray.length);
                        const endSymbol = '_&grp;';
                        const regex     = /"[^]*?",|"[^]*?"$/gm; // match character groups in need of parsing
                        const re        = new RegExp(endSymbol + '\s*?$', 'g'); // match end symbols only at the end of a row

                        const parseGroup = group => {

                            let newGroup = String(group).replace(/"\s*?$|"\s*?,\s*?$/, '').replace(/^\s*?"/, ''); // remove leading quotes and trailing quotes and commas
                            newGroup = newGroup.replace(/""/g, '"'); // replace two ajoining double quotes with one double quote
                            return newGroup.replace(cfg.commaCodes, cfg.commaSymbol) + endSymbol; // replace remaining commas with a separator symbol
                        }

                        const parseRow = row => {

                            let newRow = row.replace(re, ''); // remove end symbols at the end of a row
                            newRow = newRow.replaceAll(endSymbol, ', '); // replace any remaining end symbols inside character groups with a comma value separator
                            return newRow.replace(/(?!\s)[,](?!\s)/g, ', '); // tidy
                        }

                        // construct a JSON object from the CSV construct
                        const composeJSON = () => {

                            const nodeName = i => symbol.nodes[i] ? '"' + symbol.nodes[i] + '": ' : '"node' + i+1 + '": ';
                            const re = /,\s*?$/; // match trailing comma whitespace

                            let str = '';

                            newArray.forEach((row) => {

                                if (!rsc.ignore(row))
                                {
                                    str += '{ ';
                                    let rowArray = row.split(',');

                                    rowArray.forEach((value, i) => {

                                        str += nodeName(i) + '"' + value.trim().replace(/"/g, '\\"') + '", ';

                                    });

                                    str = str.replace(re, '') + ' },\n'
                                }

                            });

                            return '[' + str.replace(re, '') + ']';
                        }

                        const objectType = () => { return (symbol.json || symbol.nodes) ? composeJSON() : newArray.join('\n'); }

                        textArray.forEach((row) =>
                        {
                            let newRow = String(row);
                            let groups = [...newRow.matchAll(regex)]; // get character groups in need of parsing

                            groups.forEach((group) =>
                            {
                                let newGroup = parseGroup(group);
                                newRow = newRow.replace(group, newGroup);
                            });

                            newArray.push(parseRow(newRow));
                        });

                        return objectType();
                    }

                    Object.seal(atr);

                }).call(atr); // end attribute allocation

            }

        }

    }); // end HTMLElement extension

})();
