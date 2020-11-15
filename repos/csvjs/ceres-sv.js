/**
 * @license
 * ceres-sv v1.0.0
 *
 * Minified using terser v5.3.5
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
        this.getImportMetaUrl = function() { return import.meta.url; }

        this.composeElement = function(el)
        {
            const precursor = el.parent;
            const node = document.createElement(el.typeof);

            if (el.id) node.setAttribute('id', el.id);
            if (el.className) node.setAttribute('class', el.className);
            if (el.onClick) node.setAttribute('onclick', el.onClick);
            if (el.src) node.setAttribute('src', el.src);
            if (el.alt) node.setAttribute('alt', el.alt);
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

        this.getBooleanAttribute = function(attribute)
        {
            if (attribute === true || attribute === false) return attribute;
            if (this.isEmptyOrNull(attribute) || !this.isString(attribute)) return false;

            return this.bool.includes(attribute.trim().toUpperCase());
        }

        this.getUniqueElementId = function(str = null, range = 100)
        {
            let elName = function() { return str + Math.floor(Math.random() * range) };
            let el = null;

            while (document.getElementById(el = elName())) {};

            return el;
        }

        this.removeDuplcates = function(obj, sort)
        {
            const key = JSON.stringify;
            let ar = [...new Map (obj.map(node => [key(node), node])).values()];

            return sort ? ar.sort((a, b) => a - b) : ar;
        }

        this.strip = function(html)
        {
           let doc = new DOMParser().parseFromString(html, 'text/html');
           return doc.body.textContent || '';
        }

        this.htmlToText = function(html, regex)
        {
            if (this.isEmptyOrNull(html)) return;

            if (regex) return html.replace(this.markup, '');

console.log('here now');

            let doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || el.innerText;
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
                [this.notify]: function() { if (diagnostic.logtrace) console.info(diagnostic.notification); },
                [this.error]: function() { errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace } ); },
                [this.reference]: function() { if (diagnostic.logtrace) console.log('Reference: ' + this.newline + this.newline + diagnostic.reference); },
                [this.default]: function() { errorHandler({ notification: errordefault, alert: diagnostic.logtrace } ); }
            };

            lookup[diagnostic.type]() || lookup[this.default];
        }

        this.getObjectProperties = function(object, str = '')
        {
            for (let property in object) str += property + ': ' + object[property] + ', ';
            return str.replace(/, +$/g,'');
        }

        this.reference = 1;
        this.notify = 2;
        this.default = 98;
        this.error = 99;
        this.bTrue = ['true', '1', 'enable', 'confirm', 'grant', 'active', 'on', 'yes'];
        this.isWindows = (navigator.appVersion.indexOf('Win') != -1);
        this.nonWordChars = '/\()"\':,.;<>~!@#$%^&*|+=[]{}`?-…';
        this.bool = this.bTrue.toString().toUpperCase().split(',');
        this.newline = this.isWindows ? '\r\n' : '\n';
        this.whitespace = /\s/g;
        this.markup = /(<([^>]+)>)/ig;

    }).call(rsc); // end resource allocation

    const caching = {}; // http cache allocation
    (function(cache) {

        this.available = ('caches' in window);

        this.listExistingCacheNames = function()
        {
            caches.keys().then(function(cacheKeys) { console.log('listCache: ' + cacheKeys); });
        }

        this.installCache = function(namedCache, urlArray, urlImage = '/images/NAVCogs.png')
        {
            window.addEventListener('install', function(e) { e.waitUntil(caches.open(namedCache).then(function(cache) { return cache.addAll(urlArray); })); });

            window.addEventListener('fetch', function(e)
            {
                e.respondWith(caches.match(e.request).then(function(response)
                {
                    if (response !== undefined) return response;

                    return fetch(e.request).then(function (response)
                    {
                        let responseClone = response.clone();
                        caches.open(namedCache).then(function (cache) { cache.put(e.request, responseClone); });
                        return response;

                    }).catch(function () {

                        return caches.match(urlImage);

                    });

                }));

            });

        }

    }).call(caching); // end resource allocation

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
        async connectedCallback()
        {
            ceres.getImage = function(el) { rsc.srcOpen({ element: el, type: 'image' }); }; // global scope method reference
            ceres.getSlide = function(el) { atr.setSlide(el); };  // global scope method reference

            const csvNode = this; // csv root node of a DOM subtree
            const cfg = {}; // configuration attributes
            const atr = {}; // attribute allocation

            initialise();

            let css = csvNode.getAttribute('css') || cfg.defaultCSS;
            let src = csvNode.getAttribute('src') || null;

            cfg.fetchcss = !rsc.isEmptyOrNull(css);
            cfg.fetchsrc = !rsc.isEmptyOrNull(src);

            if (cfg.fetchcss) atr.fetchStylesheets(css);
            if (cfg.fetchsrc) csvNode.insertAdjacentHTML('afterbegin', rsc.htmlToText( await ( await fetch(src) ).text(), false ) );

            cfg.cache.src = cfg.cache.src.concat(src);

            if (atr.hasProperties()) atr.activate();

            function initialise()
            {
                cfg.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.attrib = {};
                cfg.cache = {};
                cfg.cache.css = [];
                cfg.cache.src = [];
                cfg.slide = 1;

                const getClickEvent = function() { return 'ceres.getSlide(this)'; }
                const getActiveState = function(className) { return !cfg.attrib.nub || cfg.attrib.static ? className : className += ' none'; } // The nub track is hidden in auto mode
                const srm = new Map(); // shadowroot manager

                const remark = {
                    imageMarkup      : 'Image list markup',
                    configAttributes : 'The ' + csv + ' element attributes: ',
                    templateSearch   : 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback template element in the document body',
                    elementSearch    : 'There is no \'embed\' elementId available. Looking for the first occurance of a <template> or <noscript> tagname',
                    precursorError   : 'Error: Unable to find the ' + csv + ' document element',
                    fetchListError   : 'Error: Unable to find either the fetch ' + csv + ' nor the fallback template ' + cfg.attrib.embed + ' elements',
                    templateError    : 'Error: Unable to find the ' + cfg.attrib.embed + ' fallback template element when searching the document body'
                };

                Object.freeze(remark);

                (function() {

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

                        if (cfg.attrib.static) rsc.setHorizontalSwipe( { node: cfg.shadow.querySelector('div.slideview-body > div.slideview-image') }, this.getSwipeEvent, { left: -1, right: 1 } );

                        rsc.inspect({ type: rsc.notify, notification: cfg.shade, logtrace: cfg.attrib.trace });
                    }

                    this.setSlide = function(node, shadow)
                    {
                        if (rsc.isEmptyOrNull(shadow)) shadow = rsc.isEmptyOrNull(node) ? cfg.shadow : this.getSlideShadow(node);
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
                        if (!this.getPrecursor()) return rsc.inspect({ type: rsc.error, notification: remark.precursorError });
                        if (!(cfg.fetchsrc || cfg.template)) return rsc.inspect({ type: rsc.error, notification: remark.fetchListError });

                        return this.attributesExist();
                    }

                    this.activate = function()
                    {
                        this.setShadow();
                        this.setSlide();
                        this.setView();
                    }

                    this.fetchStylesheets = function(str)
                    {
                        const css = str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';');
                        cfg.cache.css = rsc.removeDuplcates(cfg.cache.css.concat(css));
                    }

                    this.setStyleAttributes = function()
                    {
                        cfg.styleContainer = document.createElement('style');
                        cfg.styleContainer.id = csv + '-style';
                        cfg.styleContainer.className = 'slideview-style';

                        cfg.shade.appendChild(cfg.styleContainer);

                        cfg.cache.css.forEach(item =>
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

                    this.setImageAttributes = function()
                    {
                        const getClassName = function()
                        {
                            let className = 'view';

                            if (cfg.attrib.zoom) className += ' zoom';
                            if (cfg.attrib.fade) className += ' fade';

                            return className += ' none';
                        }

                        const getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; },
                        getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; },
                        getSubtitle = function() { return (cfg.attrib.sub) ? getAccessibilityText() : null; },
                        getSurtitle = function() { return (cfg.attrib.sur) ? index + ' / ' + cfg.imageArray.length : null; },
                        getImageEvent = function() { return cfg.attrib.zoom ? 'ceres.getImage(this);' : 'javascript:void(0);'; },
                        imageContainer = document.createElement('div'),
                        slideContainerClassName = getClassName();

                        imageContainer.id = csv + '-image';
                        imageContainer.className = 'slideview-image';

                        cfg.bodyContainer.appendChild(imageContainer);

                        let index = 0;

                        for (let item = 0; item < cfg.imageArray.length; item++)
                        {
                            var arrayItem = cfg.imageArray[item].split(',');

                            let slideContainer = document.createElement('div');
                            slideContainer.id = 'img' + (++index);
                            slideContainer.className = slideContainerClassName;

                            imageContainer.appendChild(slideContainer);

                            if (cfg.attrib.sur) rsc.composeElement({ typeof: 'div', className: 'surtitle', parent: slideContainer, markup: getSurtitle() });
                            rsc.composeElement({ typeof: 'img', className: 'slide', parent: slideContainer, onClick: getImageEvent(), src: getURL(), alt: getAccessibilityText() });
                            if (cfg.attrib.sub) rsc.composeElement({ typeof: 'div', className: 'subtitle', parent: slideContainer, markup: getSubtitle() });
                        }

                        rsc.composeElement({ typeof: 'a', className: getActiveState('left'), parent: imageContainer, markup: '&#10094;', onClick: getClickEvent() });
                        rsc.composeElement({ typeof: 'a', className: getActiveState('right'), parent: imageContainer, markup: '&#10095;', onClick: getClickEvent() });
                    }

                    // The nub track is hidden in auto mode
                    this.setTrackAttributes = function()
                    {
                        const trackContainer = document.createElement('div');
                        trackContainer.id = csv + '-nub';
                        trackContainer.className = getActiveState('slideview-nub');

                        cfg.bodyContainer.appendChild(trackContainer);

                        let index = 0;

                        for (let item = 0; item < cfg.imageArray.length; item++)
                        {
                            rsc.composeElement({ typeof: 'span', id: 'nub' + (++index), className: 'nub', parent: trackContainer, onClick: getClickEvent() });
                        }

                    }

                    this.insertCache = function()
                    {
                        if (!('caches' in window)) return;

                        const cacheName = csv + '-cache';
                        cfg.cache.script = [ rsc.getImportMetaUrl() ];

                        caching.installCache(cacheName, rsc.removeDuplcates(cfg.cache.css.concat(cfg.cache.src.concat(cfg.cache.script))));
                    }

                    this.getSwipeEvent = function(swipe)
                    {
                        const offset = (swipe.action) ? swipe.right : swipe.left;
                        cfg.slide = cfg.slide += offset;

                        setSlide(null, cfg.shadow);
                    }

                    this.getSlideShadow = function(node)
                    {
                        const root = node.getRootNode().host,
                        shade = document.querySelector('#' + root.id),
                        shadow = shade.shadowRoot,
                        slide = shadow.querySelector('div.slideview-image > div.active');

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
                            return rsc.isEmptyOrNull(embed) ? false : embed;
                        }

                        const getTemplateElement = function()
                        {
                            if (cfg.fetchsrc || !cfg.attrib.embed) return 'undefined';

                            let el = (cfg.attrib.embed) ? document.getElementById(cfg.attrib.embed) : null;

                            if (rsc.isEmptyOrNull(el))
                            {
                                rsc.inspect({ type: rsc.notify, notification: remark.elementSearch, logtrace: cfg.attrib.trace });
                                el = document.getElementsByTagName('template')[0] || document.getElementsByTagName('noscript')[0];
                            }

                            return rsc.isEmptyOrNull(el) ? 'undefined' : el;
                        }

                        const getStaticProperties = function()
                        {
                            let auto = csvNode.getAttribute('auto');

                            if (rsc.isEmptyOrNull(auto)) return true;

                            let ar = auto.replace(rsc.whitespace,'').split(',');
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
                            cfg.attrib.nub = 'false';

                            return false;
                        }

                        if (exists)
                        {
                            csvNode.id = rsc.getUniqueElementId(csv, 1000);
                            csvNode.setAttribute("class", 'none');

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

                        rsc.inspect({ type: rsc.notify, notification: remark.configAttributes + rsc.getObjectProperties(cfg.attrib), logtrace: cfg.attrib.trace });

                        const getImageList = function()
                        {
                            let shadowList = function()
                            {
                                //let content = csvNode.textContent;
                                let content = (csvNode.tagName == 'TEMPLATE') ? csvNode.content.textContent : csvNode.textContent;
                                return (!rsc.isEmptyOrNull(content)) ? content : null;
                            }

                            let lightList = function()
                            {
                                rsc.inspect({ type: rsc.notify, notification: remark.templateSearch, logtrace: cfg.attrib.trace });

                                let content = (cfg.template.tagName == 'TEMPLATE') ? cfg.template.content.textContent : cfg.template.textContent;
                                if (rsc.isEmptyOrNull(content)) return rsc.inspect({ type: rsc.error, notification: remark.templateError });

                                return content;
                            }

                            return cfg.fetchsrc ? shadowList() : lightList();
                        }

                        const isImageArray = function()
                        {
                            let imageList = getImageList();

                            if (!rsc.isEmptyOrNull(imageList))
                            {
                                rsc.inspect({ type: rsc.notify, notification: remark.imageMarkup + ' [' + (cfg.fetchsrc ? csv + ' - fetch' : cfg.attrib.embed + ' - template') + ']:' + rsc.newline + imageList, logtrace: cfg.attrib.trace });
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
