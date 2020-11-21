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

    const csv = 'ceres-sv'; // required ceres slideview html custom element

    const rsc = {}; // generic resource methods
    (function() {

        this.srcOpen = function(obj) { window.open(obj.element.getAttribute('src'), obj.type); }
        this.isString = function(obj) { return Object.prototype.toString.call(obj) == '[object String]'; }
        this.clearElement = function(el) { while (el.firstChild) el.removeChild(el.firstChild); }

        this.composeElement = function(el, atr)
        {
            if (!el.type) return;

            const precursor = this.attrib.tag.includes(el.type.trim().toUpperCase()) ? document.head : (el.parent || document.body);
            const node = document.createElement(el.type);

            Object.entries(atr).forEach(([key, value]) => { node.setAttribute(key, value); });
            if (el.markup) node.insertAdjacentHTML('afterbegin', el.markup);

            precursor.appendChild(node);
        }

        this.setHorizontalSwipe = function(touch, callback, args)
        {
            if (!touch.act) touch.act = 80;

            touch.node.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; }, { passive: true } );
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

        this.isEmptyOrNull = function(obj)
        {
            if (obj === null || obj == 'undefined') return true;

            if (this.isString(obj)) return (obj.length === 0 || !obj.trim());
            if (Array.isArray(obj)) return (obj.length === 0);
            if (obj && obj.constructor === Object) return (Object.keys(obj).length === 0);

            return !obj;
        }

        this.getBooleanAttribute = function(obj)
        {
            if (obj === true || obj === false) return atr;
            if (this.isEmptyOrNull(obj) || !this.isString(obj)) return false;

            return this.attrib.bool.includes(obj.trim().toUpperCase());
        }

        this.getUniqueElementId = function(args = {})
        {
            if (!args.name) args.name = 'n';
            if (!args.range) args.range = 100;

            let elName = function() { return args.name + Math.floor(Math.random() * args.range) };
            while (document.getElementById(args.el = elName())) {};

            return args.el;
        }

        this.removeDuplcates = function(obj, sort)
        {
            const key = JSON.stringify;
            let ar = [...new Map (obj.map(node => [key(node), node])).values()];

            return sort ? ar.sort((a, b) => a - b) : ar;
        }

        this.parseText = function(obj)
        {
            if (this.isEmptyOrNull(obj.text)) return;

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

        this.getObjectProperties = function(string = {}, str = '')
        {
            for (let literal in string) str += literal + ': ' + string[literal] + ', ';
            return str.replace(/, +$/g,'');
        }

        this.attrib =
        {
            reference   : 1,
            notify      : 2,
            warn        : 3,
            default     : 98,
            error       : 99,
            bArray      : ['true', '1', 'enable', 'confirm', 'grant', 'active', 'on', 'yes'],
            tagName     : ['link', 'script', 'style'],
            isWindows   : (navigator.appVersion.indexOf('Win') != -1),
            nonWordChars: '/\()"\':,.;<>~!@#$%^&*|+=[]{}`?-…',
            whitespace  : /\s/g,
            markup      : /(<([^>]+)>)/ig,

            get newline() { return this.isWindows ? '\r\n' : '\n'; },
            get bool() { return this.bArray.map(item => { return item.trim().toUpperCase(); }) },
            get tag() { return this.tagName.map(item => { return item.trim().toUpperCase(); }) },
            get metaUrl() { return import.meta.url; }
        }

    }).call(rsc); // end resource allocation

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
        async connectedCallback()
        {
            ceres.getImage = function(el) { rsc.srcOpen({ element: el, type: 'image' }); }; // global scope method reference
            ceres.getSlide = function(el) { atr.setSlide(el); }; // global scope method reference

            const csvNode = this; // csv root node of a DOM subtree
            const cfg = {}; // configuration attributes
            const atr = {}; // attribute allocation

            configureAttributes();

            if (cfg.fetchsrc) csvNode.insertAdjacentHTML('afterbegin', rsc.parseText( { text: atr.parseJSON( await ( await fetch(cfg.src) ).text() ) } ));

            if (atr.hasProperties()) atr.activate();

            function configureAttributes()
            {
                csvNode.src = csvNode.getAttribute('src');

                cfg.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.src = rsc.isEmptyOrNull(csvNode.src) ? null : csvNode.src.trim();
                cfg.css = csvNode.getAttribute('css') || cfg.defaultCSS;
                cfg.fetchsrc = !rsc.isEmptyOrNull(cfg.src);
                cfg.attrib = {};
                cfg.slide = 1;

                (function() {

                    const getActiveState = function(className) { return !cfg.attrib.nub || cfg.attrib.static ? className : className += ' none'; }
                    const getClickEvent = function() { return 'ceres.getSlide(this)'; }
                    const srm = new Map(); // shadowroot manager

                    const remark = {
                        imageMarkup      : 'Image list markup ',
                        configAttributes : 'The element attributes ',
                        templateSearch   : 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback template element in the document body',
                        elementSearch    : 'There is no \'embed\' elementId available. Looking for the first occurance of a <template> or <noscript> tagname',
                        precursorError   : 'Error: Unable to find the ' + csv + ' document element',
                        fetchListError   : 'Error: Unable to find either the fetch ' + csv + ' nor the fallback template elements',
                        templateError    : 'Error: Unable to find the fallback template element when searching the document body',
                        cacheWarning     : 'Warning: cache response status '
                    };

                    Object.freeze(remark);

                    this.setShadow = function()
                    {
                        cfg.shade = document.querySelector('#' + csvNode.id);

                        rsc.clearElement(cfg.shade);

                        cfg.shade.attachShadow({mode: 'open'});
                        cfg.shadow = cfg.shade.shadowRoot;

                        this.setStyleAttributes();
                        this.setBodyAttributes();
                        this.setImageAttributes();
                        this.setTrackAttributes();

                        cfg.shadow.append(cfg.styleContainer);
                        cfg.shadow.append(cfg.bodyContainer);

                        if (cfg.attrib.static) rsc.setHorizontalSwipe( { node: cfg.shadow.querySelector('div.slideview-body > div.slideview-image') }, atr.getSwipeCallback, { left: -1, right: 1 } );

                        rsc.inspect({ type: rsc.attrib.notify, notification: cfg.shade, logtrace: cfg.attrib.trace });
                    }

                    this.setSlide = function(node, shadow)
                    {
                        if (rsc.isEmptyOrNull(shadow)) shadow = rsc.isEmptyOrNull(node) ? cfg.shadow : this.getShadow(node);
                        const slides = shadow.querySelectorAll('div.slideview-image > div.view');

                        cfg.slide = cfg.slide < 1 ? slides.length : cfg.slide > slides.length ? 1 : cfg.slide;

                        const next = cfg.slide-1;

                        if (rsc.isEmptyOrNull(slides[next])) return;

                        const active = shadow.querySelector('div.slideview-image > div.active');
                        if (active) active.className = active.className.replace('active', 'none');

                        slides[next].className = slides[next].className.replace('none', 'active');

                        const enabled = shadow.querySelector('div.slideview-nub > span.enabled');
                        if (enabled) enabled.className = 'nub';

                        const nub = shadow.querySelectorAll('div.slideview-nub > span.nub');
                        nub[next].className = 'nub enabled';
                    }

                    this.setAuto = function()
                    {
                        const complete = cfg.attrib.autocancel && cfg.attrib.autocycle > -1 ? cfg.imageArray.length * cfg.attrib.autocycle : 0;
                        let iteration = complete === 0 ? 0 : 1;

                        let autoCancel = function()
                        {
                            if (!cfg.attrib.autocancel) return (cfg.slide++, false); // never stops
                            return iteration === complete || (cfg.slide++, iteration++, false); // stops when complete
                        }

                        let auto = setInterval(function run()
                        {
                            if (autoCancel()) clearInterval(auto);
                            atr.setSlide();

                        }, cfg.attrib.autopause);

                    }

                    this.setView = function()
                    {
                        setTimeout(function()
                        {
                            cfg.bodyContainer.style.display = 'block';
                            if (!cfg.attrib.static) setTimeout(function() { atr.setAuto(); }, cfg.attrib.delay);

                        }, cfg.attrib.delay);

                        if (cfg.attrib.cache) this.insertCache();
                    }

                    this.hasProperties = function()
                    {
                        if (!this.getPrecursor()) return rsc.inspect({ type: rsc.attrib.error, notification: remark.precursorError });
                        if (!(cfg.fetchsrc || cfg.template)) return rsc.inspect({ type: rsc.attrib.error, notification: remark.fetchListError });

                        return this.attributesExist();
                    }

                    this.activate = function()
                    {
                        this.setShadow();
                        this.setSlide();
                        this.setView();
                    }

                    this.setStyleAttributes = function()
                    {
                        cfg.styleContainer = document.createElement('style');
                        cfg.styleContainer.id = csv + '-style';
                        cfg.styleContainer.className = 'slideview-style';

                        cfg.shade.appendChild(cfg.styleContainer);

                        cfg.cachecss = rsc.removeDuplcates(cfg.css.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';'));

                        cfg.cachecss.forEach(item =>
                        {
                            fetch(item).then(response => response.text()).then(str =>
                            {
                                cfg.styleContainer.insertAdjacentHTML('beforeend', str)
                            });

                        });

                    }

                    this.setBodyAttributes = function()
                    {
                        cfg.bodyContainer = document.createElement('div');
                        cfg.bodyContainer.id = csv + '-body';
                        cfg.bodyContainer.className = 'slideview-body';
                        cfg.bodyContainer.style.display = 'none';

                        cfg.shade.appendChild(cfg.bodyContainer);
                    }

                    this.setImageAttributes = function(index = 0)
                    {
                        const getClassName = function(className = 'view')
                        {
                            if (cfg.attrib.zoom) className += ' zoom';
                            if (cfg.attrib.fade) className += ' fade';

                            return className += ' none';
                        }

                        const getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; };
                        const getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; };
                        const getSubtitle = function() { return (cfg.attrib.sub) ? getAccessibilityText() : null; };
                        const getSurtitle = function() { return (cfg.attrib.sur) ? index + ' / ' + cfg.imageArray.length : null; };
                        const getImageEvent = function() { return cfg.attrib.zoom ? 'ceres.getImage(this);' : 'javascript:void(0);'; };
                        const slideContainerClassName = getClassName();

                        const imageContainer = document.createElement('div');
                        imageContainer.id = csv + '-image';
                        imageContainer.className = 'slideview-image';

                        cfg.bodyContainer.appendChild(imageContainer);

                        for (let item = 0; item < cfg.imageArray.length; item++)
                        {
                            var arrayItem = cfg.imageArray[item].split(',');

                            let slideContainer = document.createElement('div');
                            slideContainer.id = 'img' + (++index);
                            slideContainer.className = slideContainerClassName;

                            imageContainer.appendChild(slideContainer);

                            if (cfg.attrib.sur) rsc.composeElement({ type: 'div', parent: slideContainer, markup: getSurtitle() }, { class: 'surtitle' });
                            rsc.composeElement({ type: 'img', parent: slideContainer }, { class: 'slide', onclick: getImageEvent(), src: getURL(), alt: getAccessibilityText() });
                            if (cfg.attrib.sub) rsc.composeElement({ type: 'div', parent: slideContainer, markup: getSubtitle() }, { class: 'subtitle' });
                        }

                        rsc.composeElement({ type: 'a', parent: imageContainer, markup: '&#10094;' }, { class: getActiveState('left'), onclick: getClickEvent() });
                        rsc.composeElement({ type: 'a', parent: imageContainer, markup: '&#10095;' }, { class: getActiveState('right'), onclick: getClickEvent() });
                    }

                    // The nub track is hidden in auto mode
                    this.setTrackAttributes = function(index = 0)
                    {
                        const trackContainer = document.createElement('div');
                        trackContainer.id = csv + '-nub';
                        trackContainer.className = getActiveState('slideview-nub');

                        cfg.bodyContainer.appendChild(trackContainer);

                        for (let item = 0; item < cfg.imageArray.length; item++)
                        {
                            rsc.composeElement({ type: 'span', parent: trackContainer }, { id: 'nub' + (++index), class: 'nub', onclick: getClickEvent() });
                        }

                    }

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

                        //cfg.cachesrc = (cfg.fetchsrc) ? cfg.src.split() : Array.from('');
                        cfg.cachesrc = (cfg.fetchsrc) ? cfg.src.split() : [ cfg.cachesrc ];

                        const cacheName = csv + '-cache';
                        const urlArray = rsc.removeDuplcates(cfg.cachesrc.concat(cfg.cachecss.concat([ rsc.attrib.metaUrl ])));

                        urlArray.forEach(url =>
                        {
                            fetch(url).then(response =>
                            {
                                if (!response.ok) { rsc.inspect({ type: rsc.attrib.warn, notification: remark.cacheWarning + '[' + response.status + '] - ' + url, logtrace: cfg.attrib.trace }); }
                                return caches.open(cacheName).then(cache => { return cache.put(url, response); });
                            });

                        });

                    }

                    this.getSwipeCallback = function(swipe)
                    {
                        const offset = (swipe.action) ? swipe.right : swipe.left;
                        cfg.slide = cfg.slide += offset;

                        atr.setSlide(null, cfg.shadow);
                    }

                    this.getShadow = function(node)
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

                    this.getPrecursor = function()
                    {
                        const exists = !rsc.isEmptyOrNull(csvNode);

                        const getZoomState = function()
                        {
                            let zoom = csvNode.getAttribute('zoom');
                            return rsc.isEmptyOrNull(zoom) ? true : rsc.getBooleanAttribute(zoom);
                        }

                        const getTemplateId = function()
                        {
                            let embed = csvNode.getAttribute('embed');
                            return rsc.isEmptyOrNull(embed) ? false : embed; // typeof boolean or typeof string
                        }

                        const getTemplateElement = function()
                        {
                            if (cfg.fetchsrc) return 'undefined';

                            let el = (cfg.attrib.embed) ? document.getElementById(cfg.attrib.embed) : null;

                            if (rsc.isEmptyOrNull(el))
                            {
                                rsc.inspect({ type: rsc.attrib.notify, notification: remark.elementSearch, logtrace: cfg.attrib.trace });
                                el = document.getElementsByTagName('template')[0] || document.getElementsByTagName('noscript')[0];
                            }

                            return rsc.isEmptyOrNull(el) ? 'undefined' : el;
                        }

                        const getStaticProperties = function()
                        {
                            let auto = csvNode.getAttribute('auto');

                            if (rsc.isEmptyOrNull(auto)) return true;

                            let ar = auto.replace(rsc.attrib.whitespace,'').split(',');
                            let item = ar[0];

                            if (!Number.isInteger(parseInt(item)))
                            {
                                if (!rsc.getBooleanAttribute(item)) return true;
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
                            csvNode.id = rsc.getUniqueElementId({ name: csv, range: 1000 });
                            csvNode.setAttribute('class', 'none');

                            cfg.attrib.delay = Number.isInteger(parseInt(csvNode.getAttribute('delay'))) ? parseInt(csvNode.getAttribute('delay')) : 250;
                            cfg.attrib.sur = rsc.getBooleanAttribute(csvNode.getAttribute('sur')); // disabled
                            cfg.attrib.sub = rsc.getBooleanAttribute(csvNode.getAttribute('sub')); // disabled
                            cfg.attrib.trace = rsc.getBooleanAttribute(csvNode.getAttribute('trace')); // disabled
                            cfg.attrib.cache = !rsc.getBooleanAttribute(csvNode.getAttribute('cache')); // enabled
                            cfg.attrib.fade = !rsc.getBooleanAttribute(csvNode.getAttribute('fade')); // enabled;
                            cfg.attrib.nub = !rsc.getBooleanAttribute(csvNode.getAttribute('nub')); // enabled
                            cfg.attrib.zoom = getZoomState(); // enabled;
                            cfg.attrib.static = getStaticProperties(); // enabled
                            cfg.attrib.embed = getTemplateId(); // template elementId when using embedded image lists

                            Object.freeze(cfg.attrib);

                            cfg.template = getTemplateElement();
                        }

                        return exists;
                    }

                    this.attributesExist = function()
                    {
                        cfg.imageArray = null;

                        rsc.inspect({ type: rsc.attrib.notify, notification: remark.configAttributes + '[' + csvNode.id + '] ' + rsc.getObjectProperties(cfg.attrib), logtrace: cfg.attrib.trace });

                        const getImageList = function()
                        {
                            let shadowList = function()
                            {
                                let content = csvNode.textContent;
                                return (!rsc.isEmptyOrNull(content)) ? content : null;
                            }

                            let lightList = function()
                            {
                                rsc.inspect({ type: rsc.attrib.notify, notification: remark.templateSearch, logtrace: cfg.attrib.trace });

                                let content = (cfg.template.tagName == 'TEMPLATE') ? cfg.template.content.textContent : cfg.template.textContent;
                                if (rsc.isEmptyOrNull(content)) return rsc.inspect({ type: rsc.attrib.error, notification: remark.templateError + ' [' + cfg.attrib.embed + ']' });

                                return content;
                            }

                            return cfg.fetchsrc ? shadowList() : lightList();
                        }

                        const isImageArray = function()
                        {
                            let imageList = getImageList();

                            if (!rsc.isEmptyOrNull(imageList))
                            {
                                rsc.inspect({ type: rsc.attrib.notify, notification: remark.imageMarkup + '[' + (cfg.fetchsrc ? csvNode.id + ' - fetch' : cfg.attrib.embed + ' - template') + ']' + rsc.attrib.newline + imageList, logtrace: cfg.attrib.trace });
                                cfg.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                            }

                            return !rsc.isEmptyOrNull(cfg.imageArray);
                        }

                        return isImageArray();
                    }

                    Object.seal(atr);

                }).call(atr); // end attribute allocation

            }

        }

    }); // end HTMLElement extension

})();
