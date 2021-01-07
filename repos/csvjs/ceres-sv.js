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
globalThis.ceres = {}; // ceres slideview global (actual or proxy) object namespace
(() => {

    const rsc = {}; // the resource object namespace
    rscMethods(); // resource object methods

    globalThis.customElements.define('ceres-sv', class extends HTMLElement { // ceres-sv global class

        async connectedCallback() {

            ceres.getImage = el => rsc.srcOpen({ element: el, type: 'image' }); // global scope method reference
            ceres.getSlide = el => atr.get.slide({ node: el }); // global scope method reference

            const cfg = {}; // configuration object namespace
            const atr = {}; // attribute object namespace

            initialise(this); // a slideview root node of the DOM subtree

            atr.setDisplay.hide();

            if (cfg.srcRoot) this.insertAdjacentHTML('afterbegin', atr.parseFile( await ( await fetch(cfg.src) ).text() ));

            for (let url of cfg.cssRoot) { cfg.shadowStyle += rsc.softSanitize( await ( await fetch(url) ).text() ); }

            if (atr.instance.hasContent()) atr.instance.showContent();

            function initialise(csvRoot) {

                csvRoot.src = csvRoot.getAttribute('src');

                cfg.defaultCSS  = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.src         = rsc.ignore(csvRoot.src) ? null : csvRoot.src.trim();
                cfg.css         = csvRoot.getAttribute('css') || cfg.defaultCSS;
                cfg.srcRoot     = !rsc.ignore(cfg.src);
                cfg.commaCodes  = /,|&comma;|&#x2c;|&#44;|U+0002C/g;
                cfg.commaSymbol = '_&c';
                cfg.shadowStyle = '';
                cfg.node        = {};
                cfg.slide       = 1;

                cfg.cssRoot = rsc.removeDuplcates(cfg.css.trim()
                    .replace(/,/gi, ';')
                    .replace(/;+$/g, '')
                    .replace(/[^\x00-\xFF]| /g, '')
                    .split(';'));

                (function() { // methods belonging to the attribute object

                    const csv = rsc.elementTag(csvRoot); // the UTF-16 lowercase element name in the HTML namespace
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

                    this.instance = { // an instance of the custom HTMLElement extension

                        hasContent: () => {

                            if (!this.content.properties()) return rsc.inspect({ type: rsc.error, notification: remark.properties });
                            if (!this.content.textList()) return rsc.inspect({ type: rsc.error, notification: remark.list });

                            return this.content.textArray();
                        },

                        showContent: () => {

                            this.get.shadow();
                            this.get.slide({ shadow: cfg.shadow });
                            this.get.view();
                        }

                    };

                    this.content = { // the custom HTMLElement extension properties

                        properties: () => {

                            const styleAttributes = ['color', 'font', 'padding', 'top', 'bottom'];  // configurable styles
                            const styleProperties = ['sub', 'sur']; // style compliant properties

                            const getTemplate = () => {

                                if (cfg.srcRoot) return 'undefined';

                                let el = document.getElementById(cfg.node.local) || null;

                                if (rsc.ignore(el)) {

                                    rsc.inspect({ type: rsc.notify, notification: remark.tagSearch, logtrace: cfg.node.trace });
                                    el = document.getElementsByTagName('template')[0] || document.getElementsByTagName('noscript')[0];
                                };

                                return el || 'undefined';
                            }

                            const getCSVRootProperties = () => {

                                if (rsc.ignore(csvRoot)) return false;

                                csvRoot.id = rsc.getUniqueId({ name: csv, range: 1000 });

                                const getProperty = name => {

                                    const factor = csvRoot.getAttribute(name);
                                    const evaluate = (name == 'cache' || name == 'zoom');

                                    const evalAttribute = () => {

                                        if (name == 'cache') {

                                            const images = atrArray.length > 1 ? atrArray[1].includes('image') : item.includes('image') || null;
                                            const cache = item.includes('image') || rsc.getBoolean(item);

                                            if (cache && !rsc.ignore(images)) cfg.node.cacheimages = images;

                                            return cache;
                                        };

                                        if (name == 'zoom') {

                                            if (/^false$/i.test(item)) return false;
                                            cfg.node.clickevent = atrArray.length > 1 ? atrArray[1] : /^true$/i.test(item) ? null : item;

                                            return rsc.ignore(cfg.node.clickevent) ? rsc.getBoolean(item) : true;
                                        };

                                    }

                                    const property = {

                                        nub     : !rsc.getBoolean(factor),
                                        fade    : !rsc.getBoolean(factor),
                                        trace   : rsc.getBoolean(factor),
                                        loading : factor || 'auto',
                                        local   : factor || false,
                                        delay   : Number.isInteger(parseInt(factor, 10)) ? parseInt(factor, 10) : 250
                                    };

                                    if (property.hasOwnProperty(name)) return property[name];
                                    if (!factor) return !!evaluate;

                                    const regex    = name != 'sur' ? /.subtitle[^&]*?}/i : /.surtitle[^&]*?}/i;
                                    const regx     = /(\s+)?:(\s+)?/g;
                                    const ar       = factor.replace(regx,':').split(',');
                                    const atrArray = ar.map(item => item.trim());
                                    const item     = atrArray[0];

                                    if (evaluate) return evalAttribute();

                                    if (!Number.isInteger(parseInt(item))) {

                                        if (!rsc.getBoolean(item)) return false;
                                        if (atrArray.length > 1) atrArray.shift();
                                    };

                                    if (name == 'auto') {

                                        cfg.node.autocycle  = Number.isInteger(parseInt(atrArray[0])) ? parseInt(atrArray[0]) : 10;
                                        cfg.node.autopause  = Number.isInteger(parseInt(atrArray[1])) ? parseInt(atrArray[1]) : 3000;
                                        cfg.node.autocancel = cfg.node.autocycle > -1;

                                        cfg.node.fade = cfg.node.autopause > 400;
                                        cfg.node.nub  = 'false'; // typeof string

                                        return true;
                                    };

                                    const getStyle = () => {

                                        if (atrArray.length == 0) return;

                                        const setStyleAttribute = attribute => {

                                            const re = Boolean(attribute.match(/color:/i)) ? /color[^&]*?;/i
                                                : Boolean(attribute.match(/font:/i)) ? /font[^&]*?;/i
                                                : Boolean(attribute.match(/padding:/i)) ? /padding[^&]*?;/i
                                                : Boolean(attribute.match(/top:/i)) ? /top[^&]*?;/i
                                                : Boolean(attribute.match(/bottom:/i)) ? /bottom[^&]*?;/i
                                                : null;

                                            if (!rsc.ignore(re)) {

                                                const group = String(cfg.shadowStyle.match(regex));

                                                if (group) {

                                                    const newGroup = group.replace(re, attribute.replace(regx,':') + ';');
                                                    if (newGroup) cfg.shadowStyle = cfg.shadowStyle.replace(group, newGroup);
                                                };

                                            };

                                        }

                                        atrArray.forEach(attribute => { if (styleAttributes.includes(attribute.split(':')[0])) setStyleAttribute(attribute); });
                                    }

                                    if (styleProperties.includes(name)) getStyle();

                                    return true;
                                }

                                cfg.node.nub     = getProperty('nub'); // enabled
                                cfg.node.fade    = getProperty('fade'); // enabled
                                cfg.node.cache   = getProperty('cache'); // enabled
                                cfg.node.trace   = getProperty('trace'); // disabled
                                cfg.node.loading = getProperty('loading'); // enabled (default auto)
                                cfg.node.local   = getProperty('local'); // local image list template elementId
                                cfg.node.zoom    = getProperty('zoom'); // enabled
                                cfg.node.delay   = getProperty('delay'); // default 250
                                cfg.node.sur     = getProperty('sur'); // disabled
                                cfg.node.sub     = getProperty('sub'); // disabled
                                cfg.node.auto    = getProperty('auto'); // disabled

                                Object.freeze(cfg.node);

                                cfg.template = getTemplate(); // local image list element

                                return true;
                            }

                            return getCSVRootProperties();
                        },

                        textList: () => (cfg.srcRoot || cfg.template),

                        textArray: () => {

                            cfg.imageArray = null;

                            rsc.inspect({ type: rsc.notify, notification: remark.element + '[' + csvRoot.id + '] ' + rsc.getProperties(cfg.node), logtrace: cfg.node.trace });

                            const regex = /\s*\n\s*/g; // match whitespace surrounding linefeed

                            const getImageList = () => {

                                const shadowList = () => {

                                    const text = csvRoot.textContent;
                                    return text.replace(regex,'\n') || null;
                                }

                                const lightList = () => {

                                    const text = rsc.elementTag(cfg.template) != 'template' ? cfg.template.textContent : cfg.template.content.textContent;
                                    if (rsc.ignore(text)) return rsc.inspect({ type: rsc.error, notification: remark.template + ' [' + cfg.node.local + ']' });

                                    return this.parseText(text).replace(regex,'\n');
                                }

                                return cfg.srcRoot ? shadowList() : lightList();
                            }

                            const isImageArray = () => {

                                const imageList = getImageList();

                                if (rsc.ignore(imageList)) return false;

                                const parseList = () => {

                                    return remark.markup + '[' + (cfg.srcRoot ? csvRoot.id + ' - ' + rsc.fileName(cfg.src)
                                        : cfg.node.local + ' - local template') + ']' + rsc.newline + imageList
                                            .replaceAll(cfg.commaSymbol, '&comma;')
                                            .replace(/&lt;/g, '<')
                                            .replace(/&gt;/g, '>');
                                }

                                rsc.inspect({ type: rsc.notify, notification: parseList(), logtrace: cfg.node.trace });
                                cfg.imageArray = imageList ? imageList.trim().split('\n') : null;

                                return !rsc.ignore(cfg.imageArray);
                            }

                            return isImageArray();
                        }

                    };

                    this.get = { // the custom HTMLElement extension

                        shadow: () => {

                            const getSwipe = swipe => {

                                const offset = swipe.action ? swipe.right : swipe.left;
                                cfg.slide = cfg.slide += offset;

                                this.get.slide({ shadow: cfg.shadow });
                            }

                            const shade = document.querySelector('#' + csvRoot.id);
                            rsc.clearElement(shade);

                            shade.attachShadow({ mode: 'open' });
                            cfg.shadow = shade.shadowRoot;

                            this.compose.style();
                            this.compose.body();

                            if (!cfg.node.auto) rsc.setSwipe({ node: cfg.shadow.querySelector('div.slideview-body > div.slideview-image') }, getSwipe, { left: -1, right: 1 });
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
                                const complete = cfg.node.autocancel && cfg.node.autocycle > -1 ? cfg.imageArray.length * cfg.node.autocycle : 0;

                                let iteration = 0;
                                let autoslide = 1;

                                const autoCancel = () => {

                                    autoslide = autoslide < 1 ? slides.length
                                        : autoslide > slides.length ? 1
                                        : autoslide;

                                    if (!cfg.node.autocancel) return (autoslide++, false); // never stops
                                    return iteration === complete || (autoslide++, iteration++, false); // stops when complete
                                }

                                const auto = setInterval(() => {

                                    if (autoCancel()) clearInterval(auto);
                                    atr.get.slide({ autoslide: autoslide-1 });

                                }, cfg.node.autopause);

                            }

                            const insertCache = () => { // cache a range of response.status values (200, 304 etc)

                                if (!globalThis.hasOwnProperty('caches')) return;

                                const name = csv + '-cache';
                                const src  = cfg.srcRoot ? cfg.src.split() : Array.from('');
                                const img  = [];

                                if (cfg.node.cacheimages) {

                                    cfg.imageArray.forEach(item => {

                                        let ar = item.split(',');
                                        if (!rsc.ignore(ar[0])) img.push(ar[0].trim());

                                    });

                                };

                                const urlArray = rsc.removeDuplcates(img.concat(src.concat(cfg.cssRoot.concat([ import.meta.url ]))));

                                urlArray.forEach(url => {

                                    fetch(url).then(response => {

                                        if (!response.ok) { rsc.inspect({ type: rsc.warn, notification: remark.cache + '[' + response.status + '] - ' + url, logtrace: cfg.node.trace }); };
                                        return caches.open(name).then(cache => { return cache.put(url, response); });

                                    });

                                });

                            }

                            setTimeout(() => {

                                if (cfg.node.auto) setTimeout(() => { getAuto(); }, cfg.node.delay);
                                atr.setDisplay.show();

                            }, cfg.node.delay);

                            if (cfg.node.cache) insertCache();

                            rsc.inspect({ type: rsc.notify, notification: cfg.shadow, logtrace: cfg.node.trace });
                        }

                    };

                    this.compose = { // compose the custom HTMLElement extension

                        style: () => {

                            const styleNode = document.createElement('style');
                            styleNode.className = 'slideview-style';
                            styleNode.insertAdjacentHTML('beforeend', cfg.shadowStyle);

                            cfg.shadow.appendChild(styleNode);
                        },

                        body: () => {

                            const setURL      = () => !rsc.ignore(obj.ar[0]) ? obj.ar[0].trim() : null;
                            const setLoading  = () => Boolean(cfg.node.loading.match(/lazy|eager|auto/i)) ? cfg.node.loading : 'auto';
                            const getSubtitle = () => cfg.node.sub ? setSubtitle() : null;
                            const getSurtitle = () => cfg.node.sur ? setSurtitle() : null;
                            const setSubtitle = () => rsc.ignore(obj.ar[1]) ? null : obj.ar[1].trim().replaceAll(cfg.commaSymbol, ',');
                            const setSurtitle = () => rsc.ignore(obj.ar[2]) ? obj.index + ' / ' + cfg.imageArray.length : obj.ar[2].trim().replaceAll(cfg.commaSymbol, ',');

                            const classlist = this.getClassList('slide');
                            const hrefImage = cfg.node.zoom ? rsc.ignore(cfg.node.clickevent) ? 'ceres.getImage(this);' : cfg.node.clickevent : null;
                            const hrefSlide = 'ceres.getSlide(this)';

                            const bodyNode = document.createElement('div');
                            bodyNode.className = 'slideview-body';

                            const imgNode = document.createElement('div');
                            imgNode.className = 'slideview-image';

                            bodyNode.appendChild(imgNode);

                            const trackNode = document.createElement('div');
                            trackNode.className = this.getClassList('slideview-nub');

                            bodyNode.appendChild(trackNode);

                            const obj = { index: 0, ar: [] };

                            cfg.imageArray.forEach(item => {

                                obj.ar = item.split(',');

                                const slideNode = document.createElement('div');
                                slideNode.className = classlist;
                                slideNode.id = 'img' + ++obj.index;

                                imgNode.appendChild(slideNode);

                                if (cfg.node.sur) rsc.composeElement({ type: 'div', parent: slideNode, markup: getSurtitle() }, { class: 'surtitle fade' });
                                rsc.composeElement({ type: 'img', parent: slideNode }, { class: 'slide', onclick: hrefImage, src: setURL(), alt: setSubtitle(), loading: setLoading() });
                                if (cfg.node.sub) rsc.composeElement({ type: 'div', parent: slideNode, markup: getSubtitle() }, { class: 'subtitle fade' });
                            });

                            rsc.composeElement({ type: 'a', parent: imgNode, markup: '&#10094;' }, { class: this.getClassList('left'), onclick: hrefSlide });
                            rsc.composeElement({ type: 'a', parent: imgNode, markup: '&#10095;' }, { class: this.getClassList('right'), onclick: hrefSlide });

                            cfg.imageArray.forEach((item, i) => { rsc.composeElement({ type: 'span', parent: trackNode }, { id: 'nub' + ++i, class: 'nub', onclick: hrefSlide }); });

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

                        if (className != 'slide') return cfg.node.nub && cfg.node.auto ? className += ' none' : className;

                        return cfg.node.zoom ? className += ' zoom'
                            : cfg.node.fade ? className += ' fade'
                            : className += ' none';
                    }

                    this.parseFile = text => {

                        const str = rsc.fileType(cfg.src, 'json') ? this.parseJSON(text)
                            : rsc.fileType(cfg.src, 'csv') ? this.parseJSON( this.parseCSV( text, { json: true, nodes: ['url','sub','sur'] } ))
                            : text;

                        return this.parseText(str);

                    }

                    this.parseText = text => {

                        return rsc.softSanitize(text
                            .replace(/\\,|&comma;|&#x2c;|&#44;|U+0002C/g, cfg.commaSymbol)
                            .replace(/^\s*?<template(.*?)>|<\/template>\s*?$/, ''))
                            .trim();
                    }

                    this.parseJSON = text => {

                        const json = JSON.parse(text);
                        let str = '';

                        json.forEach(node => {

                            str += node.url
                                + (node.sub ? ', ' + node.sub.replace(cfg.commaCodes, cfg.commaSymbol) : '')
                                + (node.sur ? ', ' + node.sur.replace(cfg.commaCodes, cfg.commaSymbol) : '')
                                + '\n';
                        });

                        return str;
                    }

                    // noddy regex comma separated value parser
                    this.parseCSV = (text, symbol = {}) => {

                        const textArray = text.split('\n'); // this assumes incorrectly that line breaks only occur at the end of rows
                        const newArray  = new Array(textArray.length);
                        const endSymbol = '_&grp;';

                        const reA = new RegExp(endSymbol + '\s*?$', 'g'); // match end symbols at the end of a row
                        const reB = /"[^]*?",|"[^]*?"$/gm; // match character groups in need of parsing
                        const reC = /"\s*?$|"\s*?,\s*?$/; // match trailing quotes & commas & whitespace
                        const reD = /^\s*?"/; // match leading quotes & whitespace
                        const reE = /""/g; // match two ajoining double quotes
                        const reF = /(?!\s)[,](?!\s)/g; // match whitespace surrounding a comma
                        const reG = /,\s*?$/; // match trailing comma & whitespace
                        const reH = /"/g; // match double quotes

                        const parseGroup = group => {

                            let newGroup = String(group)
                                .replace(reC, '') // remove trailing quotes and commas
                                .replace(reD, ''); // remove leading quotes

                            newGroup = newGroup.replace(reE, '"'); // replace two ajoining double quotes with one double quote

                            return newGroup.replace(cfg.commaCodes, cfg.commaSymbol) + endSymbol; // replace any remaining comma entities with a separator symbol
                        }

                        const parseRow = row => {

                            let newRow = row.replace(reA, ''); // remove end symbols at the end of a row
                            newRow = newRow.replaceAll(endSymbol, ', '); // replace any remaining end symbols inside character groups with a comma value separator

                            return newRow.replace(reF, ', '); // replace comma & surrounding whitespace
                        }

                        // construct a JSON object from the CSV construct
                        const composeJSON = () => {

                            const nodeName = i => symbol.nodes[i] ? '"' + symbol.nodes[i] + '": ' : '"node' + i+1 + '": ';

                            let str = '';

                            newArray.forEach(row => {

                                if (!rsc.ignore(row)) {

                                    str += '{ ';
                                    let rowArray = row.split(',');

                                    rowArray.forEach((value, i) => { str += nodeName(i) + '"' + value.trim().replace(reH, '\\"') + '", '; }); // replace quotes with escaped quotes
                                    str = str.replace(reG, '') + ' },\n'; // replace trailing comma whitespace
                                };

                            });

                            return '[' + str.replace(reG, '') + ']'; // replace trailing comma whitespace
                        }

                        const objectType = () => (symbol.json || symbol.nodes) ? composeJSON() : newArray.join('\n');

                        textArray.forEach(row => {

                            let newRow = String(row);
                            let groups = [...newRow.matchAll(reB)]; // get character groups in need of parsing

                            groups.forEach(group => {

                                let newGroup = parseGroup(group);
                                newRow = newRow.replace(group, newGroup);
                            });

                            newArray.push(parseRow(newRow));
                        });

                        return objectType();
                    }

                    Object.seal(atr);

                }).call(atr); // end of attribute allocation

            }

        }

    }); // end of the custom HTMLElement extension

    function rscMethods() {

        (function() { // methods belonging to the resource object

            this.reference = 1;
            this.notify    = 2;
            this.warn      = 3;
            this.default   = 98;
            this.error     = 99;
            this.bArray    = ['true', '1', 'enable', 'confirm', 'grant', 'active', 'on', 'yes'];
            this.elArray   = ['link', 'script', 'style'];
            this.isWindows = navigator.appVersion.indexOf('Win') != -1;
            this.newline   = this.isWindows ? '\r\n' : '\n';
            this.docHead   = this.elArray.map(item => { return item.trim().toUpperCase(); });
            this.bool      = this.bArray.map(item => { return item.trim().toUpperCase(); });

            this.clearElement = el => { while (el.firstChild) el.removeChild(el.firstChild); }
            this.elementTag   = el => el.tagName.toLocaleLowerCase();
            this.fileName     = path => path.substring(path.lastIndexOf('/')+1, path.length);
            this.fileType     = (path, type) => path.substring(path.lastIndexOf('.')+1, path.length).toUpperCase() === type.toUpperCase();
            this.srcOpen      = obj => globalThis.open(obj.element.getAttribute('src'), obj.type);
            this.isString     = obj => Object.prototype.toString.call(obj) == '[object String]';

            this.composeElement = (el, atr) => {

                if (this.ignore(el.type)) return;

                const precursor = this.docHead.includes(el.type.trim().toUpperCase()) ? document.head : (el.parent || document.body);
                const node = document.createElement(el.type);

                Object.entries(atr).forEach(([key, value]) => { if (value) node.setAttribute(key, value); });
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

                    if (Math.abs(touch.start - touch.end) > touch.act) {

                        args.action = (touch.start > touch.end);
                        callback.call(this, args);
                    };

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

                if (obj === true || obj === false) return obj;
                if (this.ignore(obj) || !this.isString(obj)) return false;

                return this.bool.includes(obj.trim().toUpperCase());
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

            this.softSanitize = (text, type = 'text/html') => {

                return this.ignore(text) ? null : new DOMParser()
                    .parseFromString(text, type).documentElement.textContent
                    .replace(/</g, '&lt;');
            }

            this.inspect = diagnostic => {

                const errorHandler = error => {

                    const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
                    console.error(err);

                    if (error.alert) alert(err);
                }

                const lookup = {

                    [this.notify]    : () => { if (diagnostic.logtrace) console.info(diagnostic.notification); },
                    [this.warn]      : () => { if (diagnostic.logtrace) console.warn(diagnostic.notification); },
                    [this.reference] : () => { if (diagnostic.logtrace) console.log('Reference: ' + this.newline + this.newline + diagnostic.reference); },
                    [this.error]     : () => errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace }),
                    [this.default]   : () => errorHandler({ notification: 'Unhandled exception' })
                };

                lookup[diagnostic.type]() || lookup[this.default];
            }

            this.getProperties = (string = {}, str = '') => {

                for (let literal in string) str += literal + ': ' + string[literal] + ', ';
                return str.replace(/, +$/g,'');
            }

        }).call(rsc); // end resource namespace

    }

})();
