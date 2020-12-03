/**
 * @license
 * ceres-sv v1.0.0
 *
 * Minified using terser v5.4.0
 * Original file: ceresbakalite/ceres-sv/repos/csvjs/ceres-sv.js
 *
 * ceresBakalite/ceres-sv is licensed under the MIT License - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2020 Alexander Munro
*/
window.ceres = {};
(function()
{
    const rsc = {}; // generic resource methods
    (function() {

        this.srcOpen = function(obj) { window.open(obj.element.getAttribute('src'), obj.type); }
        this.isString = function(obj) { return Object.prototype.toString.call(obj) == '[object String]'; }
        this.clearElement = function(el) { while (el.firstChild) el.removeChild(el.firstChild); }
        this.fileName = function(url) { return url.substring(url.lastIndexOf('/')+1); }

        this.composeElement = function(el, atr)
        {
            if (!el.type) return;

            const precursor = this.attrib.tagName.includes(el.type.trim().toUpperCase()) ? document.head : (el.parent || document.body);
            const node = document.createElement(el.type);

            Object.entries(atr).forEach(([key, value]) => { node.setAttribute(key, value); });
            if (el.markup) node.insertAdjacentHTML('afterbegin', el.markup);

            precursor.appendChild(node);
        }

        this.setSwipe = function(touch, callback, args) // horizontal swipe
        {
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

        this.ignore = function(obj)
        {
            if (obj === null || obj == 'undefined') return true;

            if (this.isString(obj)) return (obj.length === 0 || !obj.trim());
            if (Array.isArray(obj)) return (obj.length === 0);
            if (obj && obj.constructor === Object) return (Object.keys(obj).length === 0);

            return !obj;
        }

        this.getBoolean = function(obj)
        {
            if (obj === true || obj === false) return atr;
            if (this.ignore(obj) || !this.isString(obj)) return false;

            return this.attrib.bool.includes(obj.trim().toUpperCase());
        }

        this.getUniqueId = function(obj)
        {
            if (!obj.name) obj.name = 'n';
            if (!obj.range) obj.range = 100;

            let elName = function() { return obj.name + Math.floor(Math.random() * obj.range) };
            while (document.getElementById(obj.el = elName())) {};

            return obj.el;
        }

        this.removeDuplcates = function(obj, sort)
        {
            const key = JSON.stringify;
            let ar = [...new Map (obj.map(node => [key(node), node])).values()];

            return sort ? ar.sort((a, b) => a - b) : ar;
        }

        this.parseText = function(obj)
        {
            if (this.ignore(obj.text)) return;

            if (obj.regex || obj.text.includes('</template>')) return obj.text.replace(this.attrib.markup, '');

            let doc = new DOMParser().parseFromString(obj.text, 'text/html');
            return doc.body.textContent || doc.body.innerText;
        }

        this.inspect = function(diagnostic)
        {
            const errorHandler = function(error)
            {
                let err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
                console.error(err);

                if (error.alert) alert(err);
            }

            const lookup = {
                [this.attrib.notify]: function() { if (diagnostic.logtrace) console.info(diagnostic.notification); },
                [this.attrib.warn]: function() { if (diagnostic.logtrace) console.warn(diagnostic.notification); },
                [this.attrib.reference]: function() { if (diagnostic.logtrace) console.log('Reference: ' + this.attrib.newline + this.attrib.newline + diagnostic.reference); },
                [this.attrib.error]: function() { errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace }); },
                [this.attrib.default]: function() { errorHandler({ notification: 'Unhandled exception' }); }
            };

            lookup[diagnostic.type]() || lookup[this.attrib.default];
        }

        this.getProperties = function(string = {}, str = '')
        {
            for (let literal in string) str += literal + ': ' + string[literal] + ', ';
            return str.replace(/, +$/g,'');
        }

        this.attrib =
        {
            reference    : 1,
            notify       : 2,
            warn         : 3,
            default      : 98,
            error        : 99,
            bArray       : ['true', '1', 'enable', 'confirm', 'grant', 'active', 'on', 'yes'],
            pArray       : ['color', 'font', 'padding', 'top', 'bottom'],
            tArray       : ['link', 'script', 'style'],
            isWindows    : (navigator.appVersion.indexOf('Win') != -1),
            nonWordChars : '/\()"\':,.;<>~!@#$%^&*|+=[]{}`?-…',
            whitespace   : /\s/g,
            markup       : /(<([^>]+)>)/ig,

            get newline() { return this.isWindows ? '\r\n' : '\n'; },
            get bool() { return this.bArray.map(item => { return item.trim().toUpperCase(); }) },
            get tagName() { return this.tArray.map(item => { return item.trim().toUpperCase(); }) },
            get metaUrl() { return import.meta.url; }
        }

    }).call(rsc); // end resource allocation

    window.customElements.define('ceres-sv', class extends HTMLElement
    {
        async connectedCallback()
        {
            ceres.getImage = function(el) { rsc.srcOpen({ element: el, type: 'image' }); }; // global scope method reference
            ceres.getSlide = function(el) { atr.get.slide({ node: el }); }; // global scope method reference

            const csvRoot = this; // csv root node of a DOM subtree
            const cfg = {}; // configuration attributes
            const atr = {}; // attribute allocation

            configureAttributes();

            atr.getState.hide();

            if (cfg.srcRoot) csvRoot.insertAdjacentHTML('afterbegin', rsc.parseText({ text: atr.parseJSON( await ( await fetch(cfg.src) ).text() ) }));

            for (let item of cfg.cssRoot)
            {
                cfg.shadowStyle += rsc.parseText({ text: await ( await fetch(item) ).text() });
            }

            if (atr.node.hasContent()) atr.node.showContent();

            function configureAttributes()
            {
                csvRoot.src = csvRoot.getAttribute('src');

                cfg.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.src = rsc.ignore(csvRoot.src) ? null : csvRoot.src.trim();
                cfg.css = csvRoot.getAttribute('css') || cfg.defaultCSS;
                cfg.srcRoot = !rsc.ignore(cfg.src);
                cfg.cssRoot = rsc.removeDuplcates(cfg.css.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';'));
                cfg.href = 'ceres.getSlide(this)';
                cfg.attrib = {};
                cfg.slide = 1;

                (function() {

                    const csv = csvRoot.tagName.toLocaleLowerCase();
                    const srm = new Map(); // shadowroot manager

                    const remark = {
                        markup     : 'Image list markup ',
                        element    : 'The element attributes ',
                        srcSearch  : 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback template element in the document body',
                        tagSearch  : 'There is no \'embed\' elementId available. Looking for the first occurance of a <template> or <noscript> tagname',
                        properties : 'Error: Unable to find the ' + csv + ' document element',
                        list       : 'Error: Unable to find either the fetch ' + csv + ' nor the fallback template elements',
                        template   : 'Error: Unable to find the fallback template element when searching the document body',
                        cache      : 'Warning: cache response status '
                    };

                    Object.freeze(remark);

                    this.node = { // HTMLElement instance

                        hasContent: function()
                        {
                            if (!atr.content.properties()) return rsc.inspect({ type: rsc.attrib.error, notification: remark.properties });
                            if (!atr.content.textList()) return rsc.inspect({ type: rsc.attrib.error, notification: remark.list });

                            return atr.content.textArray();
                        },

                        showContent: function()
                        {
                            atr.get.shadow();
                            atr.get.slide({ shadow: cfg.shadow });
                            atr.get.view();
                        }

                    };

                    this.content = { // HTMLElement properties

                        properties: function()
                        {
                            const attributeArray = ['nub', 'sub', 'sur', 'zoom', 'cache', 'trace', 'delay', 'embed', 'fade', 'auto'];

                            const attribute = {
                                nub   : function(atr) { return !rsc.getBoolean(atr); },
                                fade  : function(atr) { return !rsc.getBoolean(atr); },
                                cache : function(atr) { return !rsc.getBoolean(atr); },
                                zoom  : function(atr) { return !!rsc.ignore(atr) || rsc.getBoolean(atr); },
                                trace : function(atr) { return rsc.getBoolean(atr); },
                                delay : function(atr) { return Number.isInteger(parseInt(atr)) ? parseInt(atr) : 250; },
                                embed : function(atr) { return rsc.ignore(atr) ? false : atr } // typeof boolean or typeof string
                            };

                            const getTemplate = function()
                            {
                                if (cfg.srcRoot) return 'undefined';

                                let el = (cfg.attrib.embed) ? document.getElementById(cfg.attrib.embed) : null;

                                if (rsc.ignore(el))
                                {
                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.tagSearch, logtrace: cfg.attrib.trace });
                                    el = document.getElementsByTagName('template')[0] || document.getElementsByTagName('noscript')[0];
                                }

                                return rsc.ignore(el) ? 'undefined' : el;
                            }

                            const getRootProperties = function()
                            {
                                if (rsc.ignore(csvRoot)) return false;
                                csvRoot.id = rsc.getUniqueId({ name: csv, range: 1000 });

                                let getRootAttribute = function(str)
                                {
                                    //let value = csvRoot.getAttribute(attribute);
                                    //if (rsc.ignore(value)) return false;

                                    //let ar = value.replace(/ :|: /gi,':').split(',');
                                    //let item = ar[0];

                                    const elStyle =
                                    {
                                        value : function() { csvRoot.getAttribute(str); },
                                        valueArray : function() { return value.replace(/ :|: /gi,':').split(','); },

                                        get property() { return rsc.attrib.pArray.map(item => { return item.trim().toUpperCase(); }) },
                                        get attribute() { return this.valueArray.map(item => { return item.trim(); }) },
                                    }

                                    if (rsc.ignore(elStyle.value)) return false;

                                    let item = elStyle.valueArray[0];

                                    if (!Number.isInteger(parseInt(item)))
                                    {
                                        if (!rsc.getBoolean(item)) return false;
                                        if (elStyle.valueArray.length > 1) elStyle.valueArray.shift();
                                    }

                                    if (str == 'auto')
                                    {
                                        cfg.attrib.autocycle = Number.isInteger(parseInt(elStyle.valueArray[0])) ? parseInt(elStyle.valueArray[0]) : 10;
                                        cfg.attrib.autopause = Number.isInteger(parseInt(elStyle.valueArray[1])) ? parseInt(elStyle.valueArray[1]) : 3000;
                                        cfg.attrib.autocancel = cfg.attrib.autocycle > -1;

                                        cfg.attrib.fade = cfg.attrib.autopause > 400;
                                        cfg.attrib.nub = 'false'; // typeof string

                                        return true;
                                    }

                                    let getStyle = function()
                                    {
                                        if (elStyle.valueArray.length == 0) return;

                                        let regex = str == 'sur' ? /.surtitle[^&]*?}/i : /.subtitle[^&]*?}/i;

                                        const styleAttribute = function(item)
                                        {
                                            let re = (Boolean(item.match(/color:/i))) ? /color[^&]*?;/i
                                                : (Boolean(item.match(/font:/i))) ? /font[^&]*?;/i
                                                : (Boolean(item.match(/padding:/i))) ? /padding[^&]*?;/i
                                                : (Boolean(item.match(/top:/i))) ? /top[^&]*?;/i
                                                : (Boolean(item.match(/bottom:/i))) ? /bottom[^&]*?;/i
                                                : null;

                                            if (!rsc.ignore(re))
                                            {
                                                let group = cfg.shadowStyle.match(regex) + '';

                                                if (group)
                                                {
                                                    let newGroup = group.replace(re, item + ';')
                                                    if (newGroup) cfg.shadowStyle = cfg.shadowStyle.replace(group, newGroup);
                                                }

                                            }

                                        }

                                        elStyle.attribute.forEach((item) => {

                                            if (elStyle.property.includes(item.toUpperCase())) styleAttribute(item);

                                        });

                                    }

                                    if (attributeArray.includes(attribute)) getStyle();

                                    return true;
                                }

                                cfg.attrib.nub   = attribute.nub(csvRoot.getAttribute('nub')); // enabled
                                cfg.attrib.fade  = attribute.fade(csvRoot.getAttribute('fade')); // enabled
                                cfg.attrib.zoom  = attribute.zoom(csvRoot.getAttribute('zoom')); // enabled
                                cfg.attrib.cache = attribute.cache(csvRoot.getAttribute('cache')); // enabled
                                cfg.attrib.trace = attribute.trace(csvRoot.getAttribute('trace')); // disabled
                                cfg.attrib.delay = attribute.delay(csvRoot.getAttribute('delay')); // default 250
                                cfg.attrib.embed = attribute.embed(csvRoot.getAttribute('embed')); // template elementId when using embedded image lists

                                cfg.attrib.sur  = getRootAttribute('sur'); // disabled
                                cfg.attrib.sub  = getRootAttribute('sub'); // disabled
                                cfg.attrib.auto = getRootAttribute('auto'); // disabled

                                Object.freeze(cfg.attrib);

                                cfg.template = getTemplate(); // element when using embedded image lists

                                return true;
                            }

                            return getRootProperties();
                        },

                        textList: function()
                        {
                            return (cfg.srcRoot || cfg.template);
                        },

                        textArray: function()
                        {
                            cfg.imageArray = null;

                            rsc.inspect({ type: rsc.attrib.notify, notification: remark.element + '[' + csvRoot.id + '] ' + rsc.getProperties(cfg.attrib), logtrace: cfg.attrib.trace });

                            const getImageList = function()
                            {
                                let shadowList = function()
                                {
                                    let text = csvRoot.textContent;
                                    return (!rsc.ignore(text)) ? text : null;
                                }

                                let lightList = function()
                                {
                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.srcSearch, logtrace: cfg.attrib.trace });

                                    let text = (cfg.template.tagName == 'TEMPLATE') ? cfg.template.content.textContent : cfg.template.textContent;
                                    if (rsc.ignore(text)) return rsc.inspect({ type: rsc.attrib.error, notification: remark.template + ' [' + cfg.attrib.embed + ']' });

                                    return text;
                                }

                                return cfg.srcRoot ? shadowList() : lightList();
                            }

                            const isImageArray = function()
                            {
                                let imageList = getImageList();

                                if (!rsc.ignore(imageList))
                                {
                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.markup + '[' + (cfg.srcRoot ? csvRoot.id + ' - ' + rsc.fileName(cfg.src) : cfg.attrib.embed + ' - template') + ']' + rsc.attrib.newline + imageList, logtrace: cfg.attrib.trace });
                                    cfg.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                                }

                                return !rsc.ignore(cfg.imageArray);
                            }

                            return isImageArray();
                        }

                    };

                    this.get = { // HTMLElement components

                        shadow: function()
                        {
                            const getSwipe = function(swipe)
                            {
                                let offset = (swipe.action) ? swipe.right : swipe.left;
                                cfg.slide = cfg.slide += offset;

                                atr.get.slide({ shadow: cfg.shadow });
                            }

                            cfg.shade = document.querySelector('#' + csvRoot.id);

                            rsc.clearElement(cfg.shade);

                            cfg.shade.attachShadow({ mode: 'open' });
                            cfg.shadow = cfg.shade.shadowRoot;

                            atr.compose.styles();
                            atr.compose.body();
                            atr.compose.images();
                            atr.compose.track();

                            cfg.shadow.append(cfg.bodyNode);

                            if (!cfg.attrib.auto) rsc.setSwipe({ node: cfg.shadow.querySelector('div.slideview-body > div.slideview-image') }, getSwipe, { left: -1, right: 1 });
                        },

                        slide: function(obj)
                        {
                            const getShadow = function(node) // shadowRoot slide manager
                            {
                                let root = node.getRootNode().host;
                                let shade = document.querySelector('#' + root.id);
                                let shadow = shade.shadowRoot;
                                let slide = shadow.querySelector('div.slideview-image > div.active');

                                cfg.slide = Number.parseInt(slide.id.replace('img', ''), 10);

                                srm.set('left', cfg.slide - 1);
                                srm.set('right', cfg.slide + 1);
                                srm.set('nub', Number.parseInt(node.id.replace('nub', ''), 10));

                                cfg.slide = srm.get(node.className);

                                return shadow;
                            }

                            if (rsc.ignore(obj.shadow)) obj.shadow = rsc.ignore(obj.node) ? cfg.shadow : getShadow(obj.node);
                            let slides = obj.shadow.querySelectorAll('div.slideview-image > div.slide');

                            cfg.slide = !rsc.ignore(obj.autoslide) ? obj.autoslide
                                : cfg.slide < 1 ? slides.length
                                : cfg.slide > slides.length ? 1
                                : cfg.slide;

                            let next = cfg.slide-1;

                            if (rsc.ignore(slides[next])) return;

                            let active = obj.shadow.querySelector('div.slideview-image > div.active');
                            if (active) active.classList.replace('active', 'none');

                            slides[next].classList.replace('none', 'active');

                            let enabled = obj.shadow.querySelector('div.slideview-nub > span.enabled');
                            if (enabled) enabled.className = 'nub';

                            let nub = obj.shadow.querySelectorAll('div.slideview-nub > span.nub');
                            nub[next].className = 'nub enabled';
                        },

                        view: function()
                        {
                            const getAuto = function()
                            {
                                let slides = cfg.shadow.querySelectorAll('div.slideview-image > div.slide');
                                let complete = cfg.attrib.autocancel && cfg.attrib.autocycle > -1 ? cfg.imageArray.length * cfg.attrib.autocycle : 0;

                                let iteration = 0;
                                let autoslide = 1;

                                let autoCancel = function()
                                {
                                    autoslide = autoslide < 1 ? slides.length
                                        : autoslide > slides.length ? 1
                                        : autoslide;

                                    if (!cfg.attrib.autocancel) return (autoslide++, false); // never stops
                                    return iteration === complete || (autoslide++, iteration++, false); // stops when complete
                                }

                                let auto = setInterval(function run()
                                {
                                    if (autoCancel()) clearInterval(auto);
                                    atr.get.slide({ autoslide: autoslide-1 });

                                }, cfg.attrib.autopause);

                            }

                            const insertCache = function() // cache a range of response.status values (200, 304 etc)
                            {
                                if (!('caches' in window)) return;

                                cfg.shadowsrc = (cfg.srcRoot) ? cfg.src.split() : Array.from('');

                                let cacheName = csv + '-cache';
                                let urlArray = rsc.removeDuplcates(cfg.shadowsrc.concat(cfg.cssRoot.concat([ rsc.attrib.metaUrl ])));

                                urlArray.forEach(url =>
                                {
                                    fetch(url).then(response =>
                                    {
                                        if (!response.ok) { rsc.inspect({ type: rsc.attrib.warn, notification: remark.cache + '[' + response.status + '] - ' + url, logtrace: cfg.attrib.trace }); }
                                        return caches.open(cacheName).then(cache => { return cache.put(url, response); });
                                    });

                                });

                            }

                            setTimeout(function()
                            {
                                if (cfg.attrib.auto) setTimeout(function() { getAuto(); }, cfg.attrib.delay);
                                atr.getState.show();

                            }, cfg.attrib.delay);

                            if (cfg.attrib.cache) insertCache();

                            rsc.inspect({ type: rsc.attrib.notify, notification: cfg.shadow, logtrace: cfg.attrib.trace });
                        }

                    };

                    this.compose = { // HTMLElement compose extension

                        styles: function()
                        {
                            cfg.styleNode = document.createElement('style');
                            cfg.styleNode.className = 'slideview-style';
                            cfg.styleNode.insertAdjacentHTML('beforeend', cfg.shadowStyle);

                            cfg.shadow.append(cfg.styleNode);
                        },

                        body: function()
                        {
                            cfg.bodyNode = document.createElement('div');
                            cfg.bodyNode.className = 'slideview-body';

                            cfg.shade.appendChild(cfg.bodyNode);
                        },

                        images: function(index = 0)
                        {
                            const setURL = function() { return (!rsc.ignore(arrayItem[0])) ? arrayItem[0].trim() : null; };
                            const setSurText = function() { return (!rsc.ignore(arrayItem[2])) ? arrayItem[2].trim() : index + ' / ' + cfg.imageArray.length; };
                            const setSubText = function() { return (!rsc.ignore(arrayItem[1])) ? arrayItem[1].trim() : null; };
                            const setSurtitle = function() { return (cfg.attrib.sur) ? setSurText() : null; };
                            const setSubtitle = function() { return (cfg.attrib.sub) ? setSubText() : null; };

                            let zoomEvent = cfg.attrib.zoom ? 'ceres.getImage(this);' : 'javascript:void(0);'
                            let classlist = atr.getClassList('slide');

                            const imgNode = document.createElement('div');
                            imgNode.className = 'slideview-image';

                            cfg.bodyNode.appendChild(imgNode);

                            for (let item = 0; item < cfg.imageArray.length; item++)
                            {
                                var arrayItem = cfg.imageArray[item].split(',');

                                let slideNode = document.createElement('div');
                                slideNode.id = 'img' + (++index);
                                slideNode.className = classlist;

                                imgNode.appendChild(slideNode);

                                if (cfg.attrib.sur) rsc.composeElement({ type: 'div', parent: slideNode, markup: setSurtitle() }, { class: 'surtitle fade' });
                                rsc.composeElement({ type: 'img', parent: slideNode }, { class: 'slide', onclick: zoomEvent, src: setURL(), alt: setSubText() });
                                if (cfg.attrib.sub) rsc.composeElement({ type: 'div', parent: slideNode, markup: setSubtitle() }, { class: 'subtitle fade' });
                            }

                            rsc.composeElement({ type: 'a', parent: imgNode, markup: '&#10094;' }, { class: atr.getClassList('left'), onclick: cfg.href });
                            rsc.composeElement({ type: 'a', parent: imgNode, markup: '&#10095;' }, { class: atr.getClassList('right'), onclick: cfg.href });
                        },

                        track: function(index = 0)
                        {
                            const trackNode = document.createElement('div');
                            trackNode.className = atr.getClassList('slideview-nub');

                            cfg.bodyNode.appendChild(trackNode);

                            for (let item = 0; item < cfg.imageArray.length; item++)
                            {
                                rsc.composeElement({ type: 'span', parent: trackNode }, { id: 'nub' + (++index), class: 'nub', onclick: cfg.href });
                            }

                        }

                    };

                    this.getClassList = function(className)
                    {
                        if (className != 'slide') return cfg.attrib.nub && cfg.attrib.auto ? className += ' none' : className;

                        if (cfg.attrib.zoom) className += ' zoom';
                        if (cfg.attrib.fade) className += ' fade';

                        return className += ' none';
                    }

                    this.getState = {

                        hide: function()
                        {
                            csvRoot.style.visibility = 'hidden';
                            csvRoot.style.display = 'none';
                        },

                        show: function()
                        {
                            csvRoot.style.removeProperty('display');
                            csvRoot.style.removeProperty('visibility');

                            if (csvRoot.style.length === 0) csvRoot.removeAttribute("style");
                        }

                    };

                    this.parseJSON = function(textList, jsonList = '')
                    {
                        if (cfg.src.substring(cfg.src.lastIndexOf('.'), cfg.src.length) != '.json') return textList;

                        let json = JSON.parse(textList);
                        json.forEach((node) =>
                        {
                            jsonList += node.url
                                + ((node.sub) ? ', ' + node.sub : '')
                                + ((node.sur) ? ', ' + node.sur : '')
                                + '\n';
                        });

                        return jsonList;
                    }

                    Object.seal(atr);

                }).call(atr); // end attribute allocation

            }

        }

    }); // end HTMLElement extension

})();
