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
    'use strict'; // for conformity - strict by default

    const rsc = {}; // generic resource methods
    (function() {

        this.srcOpen = function(obj) { window.open(obj.element.getAttribute('src'), obj.type); }
        this.isString = function(obj) { return Object.prototype.toString.call(obj) == '[object String]'; }
        this.clearElement = function(el) { while (el.firstChild) el.removeChild(el.firstChild); }

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
            tagArray     : ['link', 'script', 'style'],
            isWindows    : (navigator.appVersion.indexOf('Win') != -1),
            nonWordChars : '/\()"\':,.;<>~!@#$%^&*|+=[]{}`?-…',
            whitespace   : /\s/g,
            markup       : /(<([^>]+)>)/ig,

            get newline() { return this.isWindows ? '\r\n' : '\n'; },
            get bool() { return this.bArray.map(item => { return item.trim().toUpperCase(); }) },
            get tagName() { return this.tagArray.map(item => { return item.trim().toUpperCase(); }) },
            get metaUrl() { return import.meta.url; }
        }

    }).call(rsc); // end resource allocation

    window.customElements.define('ceres-sv', class extends HTMLElement
    {
        async connectedCallback()
        {
            ceres.getImage = function(el) { rsc.srcOpen({ element: el, type: 'image' }); }; // global scope method reference
            ceres.getSlide = function(el) { atr.get.slide({ node: el }); }; // global scope method reference

            const csvNode = this; // csv root node of a DOM subtree
            const cfg = {}; // configuration attributes
            const atr = {}; // attribute allocation

            configureAttributes();

            atr.getState.hide();

            if (cfg.fetchsrc) csvNode.insertAdjacentHTML('afterbegin', rsc.parseText({ text: atr.parseJSON( await ( await fetch(cfg.src) ).text() ) }));

            if (atr.node.hasContent()) atr.node.showContent();

            function configureAttributes()
            {
                csvNode.src = csvNode.getAttribute('src');

                cfg.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.css = csvNode.getAttribute('css') || cfg.defaultCSS;
                cfg.src = rsc.ignore(csvNode.src) ? null : csvNode.src.trim();
                cfg.fetchsrc = !rsc.ignore(cfg.src);
                cfg.href = 'ceres.getSlide(this)';
                cfg.attrib = {};
                cfg.slide = 1;

                (function() {

                    const csv = csvNode.tagName.toLocaleLowerCase();
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
                            if (!atr.content.textlist()) return rsc.inspect({ type: rsc.attrib.error, notification: remark.list });

                            return atr.content.textarray();
                        },

                        showContent: function()
                        {
                            atr.get.shadow();
                            atr.get.slide({ shadow: cfg.shadow });
                            atr.get.view();
                        },

                    };

                    this.get = { // HTMLElement components

                        shadow: function()
                        {
                            cfg.shade = document.querySelector('#' + csvNode.id);

                            rsc.clearElement(cfg.shade);

                            cfg.shade.attachShadow({ mode: 'open' });
                            cfg.shadow = cfg.shade.shadowRoot;

                            atr.compose.styles();
                            atr.compose.body();
                            atr.compose.images();
                            atr.compose.track();

                            cfg.shadow.append(cfg.bodyNode);

                            if (cfg.attrib.static) rsc.setSwipe({ node: cfg.shadow.querySelector('div.slideview-body > div.slideview-image') }, atr.getSwipe, { left: -1, right: 1 });
                        },

                        slide: function(obj)
                        {
                            if (rsc.ignore(obj.shadow)) obj.shadow = rsc.ignore(obj.node) ? cfg.shadow : atr.getShadow(obj.node);
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

                        view: function()
                        {
                            setTimeout(function()
                            {
                                if (!cfg.attrib.static) setTimeout(function() { atr.getAuto(); }, cfg.attrib.delay);
                                atr.getState.show();

                            }, cfg.attrib.delay);

                            if (cfg.attrib.cache) atr.insertCache();

                            rsc.inspect({ type: rsc.attrib.notify, notification: cfg.shadow, logtrace: cfg.attrib.trace });
                        }

                    };

                    this.content = { // HTMLElement properties

                        properties: function()
                        {
                            const exists = !rsc.ignore(csvNode);

                            const getZoom = function()
                            {
                                let zoom = csvNode.getAttribute('zoom');
                                return !!rsc.ignore(zoom) || rsc.getBoolean(zoom);
                            }

                            const getEmbed = function()
                            {
                                let embed = csvNode.getAttribute('embed');
                                return rsc.ignore(embed) ? false : embed; // typeof boolean or typeof string
                            }

                            const getTemplate = function()
                            {
                                if (cfg.fetchsrc) return 'undefined';

                                let el = (cfg.attrib.embed) ? document.getElementById(cfg.attrib.embed) : null;

                                if (rsc.ignore(el))
                                {
                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.tagSearch, logtrace: cfg.attrib.trace });
                                    el = document.getElementsByTagName('template')[0] || document.getElementsByTagName('noscript')[0];
                                }

                                return rsc.ignore(el) ? 'undefined' : el;
                            }

                            const getStatic = function()
                            {
                                let auto = csvNode.getAttribute('auto');

                                if (rsc.ignore(auto)) return true;

                                let ar = auto.replace(rsc.attrib.whitespace,'').split(',');
                                let item = ar[0];

                                if (!Number.isInteger(parseInt(item)))
                                {
                                    if (!rsc.getBoolean(item)) return true;
                                    if (ar.length > 1) ar.shift();
                                }

                                cfg.attrib.autocycle = Number.isInteger(parseInt(ar[0])) ? parseInt(ar[0]) : 10;
                                cfg.attrib.autopause = Number.isInteger(parseInt(ar[1])) ? parseInt(ar[1]) : 3000;
                                cfg.attrib.autocancel = cfg.attrib.autocycle > -1;

                                cfg.attrib.fade = cfg.attrib.autopause > 400;
                                cfg.attrib.nub = 'false'; // typeof string

                                return false;
                            }

                            if (exists)
                            {
                                csvNode.id = rsc.getUniqueId({ name: csv, range: 1000 });

                                cfg.attrib.delay = Number.isInteger(parseInt(csvNode.getAttribute('delay'))) ? parseInt(csvNode.getAttribute('delay')) : 250;
                                cfg.attrib.sur = rsc.getBoolean(csvNode.getAttribute('sur')); // disabled
                                cfg.attrib.sub = rsc.getBoolean(csvNode.getAttribute('sub')); // disabled
                                cfg.attrib.trace = rsc.getBoolean(csvNode.getAttribute('trace')); // disabled
                                cfg.attrib.cache = !rsc.getBoolean(csvNode.getAttribute('cache')); // enabled
                                cfg.attrib.fade = !rsc.getBoolean(csvNode.getAttribute('fade')); // enabled
                                cfg.attrib.nub = !rsc.getBoolean(csvNode.getAttribute('nub')); // enabled
                                cfg.attrib.zoom = getZoom(); // enabled
                                cfg.attrib.static = getStatic(); // enabled
                                cfg.attrib.embed = getEmbed(); // template elementId when using embedded image lists

                                Object.freeze(cfg.attrib);

                                cfg.template = getTemplate();
                            }

                            return exists;
                        },

                        textList: function()
                        {
                            return (cfg.fetchsrc || cfg.template);
                        },

                        textArray: function()
                        {
                            cfg.imageArray = null;

                            rsc.inspect({ type: rsc.attrib.notify, notification: remark.element + '[' + csvNode.id + '] ' + rsc.getProperties(cfg.attrib), logtrace: cfg.attrib.trace });

                            const getImageList = function()
                            {
                                let shadowList = function()
                                {
                                    let text = csvNode.textContent;
                                    return (!rsc.ignore(text)) ? text : null;
                                }

                                let lightList = function()
                                {
                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.srcSearch, logtrace: cfg.attrib.trace });

                                    let text = (cfg.template.tagName == 'TEMPLATE') ? cfg.template.content.textContent : cfg.template.textContent;
                                    if (rsc.ignore(text)) return rsc.inspect({ type: rsc.attrib.error, notification: remark.template + ' [' + cfg.attrib.embed + ']' });

                                    return text;
                                }

                                return cfg.fetchsrc ? shadowList() : lightList();
                            }

                            const isImageArray = function()
                            {
                                let imageList = getImageList();

                                if (!rsc.ignore(imageList))
                                {
                                    rsc.inspect({ type: rsc.attrib.notify, notification: remark.markup + '[' + (cfg.fetchsrc ? csvNode.id + ' - fetch' : cfg.attrib.embed + ' - template') + ']' + rsc.attrib.newline + imageList, logtrace: cfg.attrib.trace });
                                    cfg.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                                }

                                return !rsc.ignore(cfg.imageArray);
                            }

                            return isImageArray();
                        }

                    };

                    this.compose = { // HTMLElement compose extension

                        styles: function()
                        {
                            cfg.styleNode = document.createElement('style');
                            cfg.styleNode.className = 'slideview-style';

                            cfg.shade.appendChild(cfg.styleNode);

                            cfg.cachecss = rsc.removeDuplcates(cfg.css.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';'));

                            cfg.cachecss.forEach(item =>
                            {
                                fetch(item).then(response => response.text()).then(str =>
                                {
                                    cfg.styleNode.insertAdjacentHTML('beforeend', str)
                                });

                            });

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
                            const setText = function() { return (!rsc.ignore(arrayItem[1])) ? arrayItem[1].trim() : null; };
                            const setSubtitle = function() { return (cfg.attrib.sub) ? setText() : null; };
                            const setSurtitle = function() { return (cfg.attrib.sur) ? index + ' / ' + cfg.imageArray.length : null; };
                            const zoomEvent = cfg.attrib.zoom ? 'ceres.getImage(this);' : 'javascript:void(0);'
                            const classlist = atr.getClassList('slide');

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

                                if (cfg.attrib.sur) rsc.composeElement({ type: 'div', parent: slideNode, markup: setSurtitle() }, { class: 'surtitle' });
                                rsc.composeElement({ type: 'img', parent: slideNode }, { class: 'slide', onclick: zoomEvent, src: setURL(), alt: setText() });
                                if (cfg.attrib.sub) rsc.composeElement({ type: 'div', parent: slideNode, markup: setSubtitle() }, { class: 'subtitle' });
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
                        if (className != 'slide') return !cfg.attrib.nub || cfg.attrib.static ? className : className += ' none';

                        if (cfg.attrib.zoom) className += ' zoom';
                        if (cfg.attrib.fade) className += ' fade';

                        return className += ' none';
                    }

                    this.getSwipe = function(swipe)
                    {
                        const offset = (swipe.action) ? swipe.right : swipe.left;
                        cfg.slide = cfg.slide += offset;

                        atr.get.slide({ shadow: cfg.shadow });
                    }

                    this.getShadow = function(node) // shadowRoot slide manager
                    {
                        const root = node.getRootNode().host;
                        const shade = document.querySelector('#' + root.id);
                        const shadow = shade.shadowRoot;
                        const slide = shadow.querySelector('div.slideview-image > div.active');

                        cfg.slide = Number.parseInt(slide.id.replace('img', ''), 10);

                        srm.set('left', cfg.slide - 1);
                        srm.set('right', cfg.slide + 1);
                        srm.set('nub', Number.parseInt(node.id.replace('nub', ''), 10));

                        cfg.slide = srm.get(node.className);

                        return shadow;
                    }

                    this.getAuto = function()
                    {
                        const slides = cfg.shadow.querySelectorAll('div.slideview-image > div.slide');
                        const complete = cfg.attrib.autocancel && cfg.attrib.autocycle > -1 ? cfg.imageArray.length * cfg.attrib.autocycle : 0;

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

                    this.getState = {

                        hide: function() {
                            csvNode.classList.add('none');
                            csvNode.style.display = 'none';
                        },

                        show: function() {
                            csvNode.classList.remove('none');
                            csvNode.style.removeProperty('display');

                            if (csvNode.classList.length === 0) csvNode.removeAttribute("class");
                            if (csvNode.style.length === 0) csvNode.removeAttribute("style");
                        }

                    };

                    this.parseJSON = function(textList, jsonList = '')
                    {
                        if (cfg.src.substring(cfg.src.lastIndexOf('.'), cfg.src.length) != '.json') return textList;

                        let json = JSON.parse(textList);
                        json.forEach((node) => { jsonList += node.url + ', ' + node.text + '\n'; });

                        return jsonList;
                    }

                    this.insertCache = function() // cache a range of response.status values (200, 304 etc)
                    {
                        if (!('caches' in window)) return;

                        cfg.cachesrc = (cfg.fetchsrc) ? cfg.src.split() : Array.from('');

                        const cacheName = csv + '-cache';
                        const urlArray = rsc.removeDuplcates(cfg.cachesrc.concat(cfg.cachecss.concat([ rsc.attrib.metaUrl ])));

                        urlArray.forEach(url =>
                        {
                            fetch(url).then(response =>
                            {
                                if (!response.ok) { rsc.inspect({ type: rsc.attrib.warn, notification: remark.cache + '[' + response.status + '] - ' + url, logtrace: cfg.attrib.trace }); }
                                return caches.open(cacheName).then(cache => { return cache.put(url, response); });
                            });

                        });

                    }

                    Object.seal(atr);

                }).call(atr); // end attribute allocation

            }

        }

    }); // end HTMLElement extension

})();
