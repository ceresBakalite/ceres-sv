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
    'use strict';

    const csv = 'ceres-sv'; // required ceres slideview element name
    const cns = 'ceres-csv'; // optional markup noscript tag id when using an embedded image list

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
        async connectedCallback()
        {
            ceres.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
            ceres.getSlide = function(el) { setSlide(el); };  // global scope method reference

            const progenitor = this,
            caching = {}, // http cache allocation
            cfg = {}, // configuration attributes
            rsa = {}, // notification strings
            rsc = {}, // generic resource allocation
            atr = {}, // attribute allocation
            srm = new Map(); // shadowroot manager

            initialise();

            let css = progenitor.getAttribute('css') || cfg.defaultCSS;
            let src = progenitor.getAttribute('src') || null;

            cfg.fetchcss = !rsc.isEmptyOrNull(css);
            cfg.fetchsrc = !rsc.isEmptyOrNull(src);

            if (cfg.fetchcss) await ( await atr.fetchStylesheets(css) );
            if (cfg.fetchsrc) progenitor.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            cfg.cache.src = cfg.cache.src.concat(src);

            if (atr.nodeAttributes()) activateNode();

            function getSlideView()
            {
                cfg.shade = document.querySelector('#' + progenitor.id);

                rsc.clearElement(cfg.shade);

                cfg.shade.attachShadow({mode: 'open'});
                cfg.shadow = cfg.shade.shadowRoot;

                atr.getStyleAttributes();
                atr.getBodyAttributes();
                atr.getImageAttributes();
                atr.getTrackAttributes();

                cfg.shadow.append(cfg.styleContainer);
                cfg.shadow.append(cfg.bodyContainer);

                if (cfg.attrib.static) rsc.setHorizontalSwipe( { node: cfg.shadow.querySelector('div.slideview-body > div.slideview-image') }, getSwipeEvent, { left: -1, right: 1 } );

                rsc.inspect({ type: rsc.constant.notify, notification: cfg.shade, logtrace: cfg.attrib.trace });
            }

            function getSwipeEvent(swipe)
            {
                const offset = (swipe.action) ? swipe.right : swipe.left;
                cfg.slide = cfg.slide += offset;

                setSlide(null, cfg.shadow);
            }

            function setSlide(node, shadow)
            {
                if (rsc.isEmptyOrNull(shadow)) shadow = rsc.isEmptyOrNull(node) ? cfg.shadow : atr.shadowSlide(node);
                const slides = shadow.querySelectorAll('div.slideview-image > div.view');

                cfg.slide = cfg.slide < 1 ? slides.length : cfg.slide > slides.length ? 1 : cfg.slide;

                const view = cfg.slide-1;

                if (rsc.isEmptyOrNull(slides[view])) return;

                const active = shadow.querySelector('div.slideview-image > div.active');
                if (active) active.className = active.className.replace('active', 'none');

                slides[view].className = slides[view].className.replace('none', 'active');

                const enabled = shadow.querySelector('div.slideview-nub > span.enabled');
                if (enabled) enabled.className = 'nub';

                const nub = shadow.querySelectorAll('div.slideview-nub > span.nub');
                nub[view].className = 'nub enabled';
            }

            function autoSlide()
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
                    setSlide();

                }, cfg.attrib.autopause);

            }

            function activateNode()
            {
                let setDisplay = function(attribute)
                {
                    const node = cfg.shadow.querySelector('div.slideview-body');
                    node.style.display = attribute;
                }

                let setCache = function()
                {
                    if (!caching.available) return;

                    const cacheName = csv + '-cache';
                    cfg.cache.script = [ rsc.getImportMetaUrl() ];

                    caching.installCache(cacheName, rsc.removeDuplcates(cfg.cache.css.concat(cfg.cache.src.concat(cfg.cache.script))));
                }

                getSlideView();
                setSlide();

                if (cfg.attrib.cache) setCache();

                setTimeout(function() { setDisplay('block'); }, cfg.attrib.delay);

                if (!cfg.attrib.static) setTimeout(function() { autoSlide(); }, cfg.attrib.delay * 2);
            }

            function initialise()
            {
                rsa.imageMarkup = 'Image list markup';
                rsa.configAttributes = 'The ' + csv + ' element attributes: ';
                rsa.noscriptSearch = 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback noscript element in the document body';
                rsa.progenitorError = 'Error: Unable to find the ' + csv + ' document element';
                rsa.imageListError = 'Error: Unable to find either the fetch ' + csv + ' nor the fallback noscript ' + cns + ' elements';
                rsa.noscriptError = 'Error: Unable to find the ' + cns + ' fallback noscript element when searching the document body';

                Object.freeze(rsa);

                cfg.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.attrib = {};
                cfg.cache = {};
                cfg.cache.css = [];
                cfg.cache.src = [];
                cfg.slide = 1;

                // attribute allocation
                (function() {

                    const getClickEvent = function() { return 'ceres.getSlide(this)'; }
                    const getActiveState = function(link) { return !cfg.attrib.nub || cfg.attrib.static ? link : link += ' none'; }

                    atr.fetchStylesheets = function(str)
                    {
                        const css = str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';');
                        cfg.cache.css = rsc.removeDuplcates(cfg.cache.css.concat(css));
                    }

                    atr.getStyleAttributes = function()
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

                    atr.getBodyAttributes = function()
                    {
                        cfg.bodyContainer = document.createElement('div');
                        cfg.bodyContainer.id = csv + '-body';
                        cfg.bodyContainer.className = 'slideview-body';
                        cfg.bodyContainer.style.display  = 'none';

                        cfg.shade.appendChild(cfg.bodyContainer);
                    }

                    atr.getImageAttributes = function()
                    {
                        const getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
                        const getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }
                        const getSubtitle = function() { return (cfg.attrib.sub) ? getAccessibilityText() : null; }
                        const getSurtitle = function(index) { return (cfg.attrib.sur) ? index + ' / ' + cfg.imageArray.length : null; }
                        const getImageEvent = function() { return cfg.attrib.zoom ? 'ceres.getImage(this);' : 'javascript:void(0);'; }
                        const imageContainer = document.createElement('div');

                        imageContainer.id = csv + '-image';
                        imageContainer.className = 'slideview-image';

                        cfg.bodyContainer.appendChild(imageContainer);

                        for (let item = 0; item < cfg.imageArray.length; item++)
                        {
                            var arrayItem = cfg.imageArray[item].split(',');
                            let index = item + 1;

                            let slideContainer = document.createElement('div');
                            slideContainer.id = 'img' + index;
                            slideContainer.className = atr.getViewClass();

                            imageContainer.appendChild(slideContainer);

                            if (cfg.attrib.sur) rsc.composeElement({ typeof: 'div', className: 'surtitle', parent: slideContainer, markup: getSurtitle(index) });
                            rsc.composeElement({ typeof: 'img', className: 'slide', parent: slideContainer, onClick: getImageEvent(), src: getURL(), alt: getAccessibilityText() });
                            if (cfg.attrib.sub) rsc.composeElement({ typeof: 'div', className: 'subtitle', parent: slideContainer, markup: getSubtitle() });
                        }

                        rsc.composeElement({ typeof: 'a', className: getActiveState('left'), parent: imageContainer, markup: '&#10094;', onClick: getClickEvent() });
                        rsc.composeElement({ typeof: 'a', className: getActiveState('right'), parent: imageContainer, markup: '&#10095;', onClick: getClickEvent() });
                    }

                    atr.getTrackAttributes = function()
                    {
                        const getTrackId = function(index) { return 'nub' + index; }
                        const trackContainer = document.createElement('div');

                        trackContainer.id = csv + '-nub';
                        trackContainer.className = getActiveState('slideview-nub');

                        cfg.bodyContainer.appendChild(trackContainer);

                        for (let item = 0; item < cfg.imageArray.length; item++)
                        {
                            let index = item + 1;
                            rsc.composeElement({ typeof: 'span', id: getTrackId(index), className: 'nub', parent: trackContainer, onClick: getClickEvent() });
                        }

                    }

                    atr.getViewClass = function()
                    {
                        let className = 'view';

                        if (cfg.attrib.zoom) className += ' zoom';
                        if (cfg.attrib.fade) className += ' fade';

                        return className += ' none';
                    }

                    atr.shadowSlide = function(node)
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

                    atr.precursor = function()
                    {
                        const exists = !rsc.isEmptyOrNull(progenitor);
                        const auto = progenitor.getAttribute('auto');

                        const getZoomState = function()
                        {
                            const zoom = progenitor.getAttribute('zoom');
                            return rsc.isEmptyOrNull(zoom) ? true : rsc.getBooleanAttribute(zoom);
                        }

                        const getAutoProperties = function(locale = 'en')
                        {
                            if (rsc.isEmptyOrNull(auto)) return true;

                            const ar = auto.replace(rsc.constant.whitespace,'').split(',');
                            const item = ar[0].toLocaleLowerCase(locale);

                            if (!Number.isInteger(parseInt(item)))
                            {
                                if (!rsc.getBooleanAttribute(item)) return true;
                                if (ar.length > 1) ar.shift();
                            }

                            cfg.attrib.autocycle = Number.isInteger(parseInt(ar[0])) ? parseInt(ar[0]) : 10;
                            cfg.attrib.autopause = Number.isInteger(parseInt(ar[1])) ? parseInt(ar[1]) : 3000;
                            cfg.attrib.autocancel = cfg.attrib.autocycle > -1;

                            cfg.attrib.fade = cfg.attrib.autopause > 400;

                            return false;
                        }

                        if (exists)
                        {
                            progenitor.id = rsc.getUniqueElementId(csv, 1000);
                            progenitor.setAttribute("class", 'delay');

                            cfg.noscript = document.getElementById(cns) || document.getElementsByTagName('noscript')[0];

                            cfg.attrib.delay = Number.isInteger(parseInt(progenitor.getAttribute('delay'))) ? parseInt(progenitor.getAttribute('delay')) : 250;
                            cfg.attrib.sur = rsc.getBooleanAttribute(progenitor.getAttribute('sur')); // disabled
                            cfg.attrib.sub = rsc.getBooleanAttribute(progenitor.getAttribute('sub')); // disabled
                            cfg.attrib.trace = rsc.getBooleanAttribute(progenitor.getAttribute('trace')); // disabled
                            cfg.attrib.cache = !rsc.getBooleanAttribute(progenitor.getAttribute('cache')); // enabled
                            cfg.attrib.fade = !rsc.getBooleanAttribute(progenitor.getAttribute('fade')); // enabled;
                            cfg.attrib.nub = !rsc.getBooleanAttribute(progenitor.getAttribute('nub')); // enabled
                            cfg.attrib.zoom = getZoomState(); // enabled;
                            cfg.attrib.static = getAutoProperties(); // enabled

                            Object.seal(cfg.attrib);
                        }

                        return exists;
                    }

                    atr.attributesExist = function()
                    {
                        cfg.imageArray = null;

                        rsc.inspect({ type: rsc.constant.notify, notification: rsa.configAttributes + rsc.getObjectProperties(cfg.attrib), logtrace: cfg.attrib.trace });

                        const getImageList = function()
                        {
                            const getFetchList = function() { return (!rsc.isEmptyOrNull(progenitor.textContent)) ? progenitor.textContent : null; }

                            let getContentList = function()
                            {
                                rsc.inspect({ type: rsc.constant.notify, notification: rsa.noscriptSearch, logtrace: cfg.attrib.trace });

                                const list = !rsc.isEmptyOrNull(cfg.noscript) ? cfg.noscript.textContent : null;
                                return !rsc.isEmptyOrNull(list) ? list : rsc.inspect({ type: rsc.constant.error, notification: rsa.noscriptError, logtrace: cfg.attrib.trace });
                            }

                            return cfg.fetchsrc ? getFetchList() : getContentList();
                        }

                        const isImageArray = function()
                        {
                            const imageList = getImageList();

                            if (!rsc.isEmptyOrNull(imageList))
                            {
                                rsc.inspect({ type: rsc.constant.notify, notification: rsa.imageMarkup + ' [' + (cfg.fetchsrc ? csv + ' - fetch' : cns + ' - noscript') + ']:' + rsc.constant.newline + imageList, logtrace: cfg.attrib.trace });
                                cfg.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                            }

                            return !rsc.isEmptyOrNull(cfg.imageArray);
                        }

                        return isImageArray();
                    }

                    atr.nodeAttributes = function()
                    {
                        if (!atr.precursor()) return rsc.inspect({ type: rsc.constant.error, notification: rsa.progenitorError, logtrace: cfg.attrib.trace });
                        if (!(cfg.fetchsrc || cfg.noscript)) return rsc.inspect({ type: rsc.constant.error, notification: rsa.imageListError, logtrace: cfg.attrib.trace });

                        return atr.attributesExist();
                    }

                })(); // end attribute allocation

                Object.freeze(atr);

                // caching;
                (function(cache) {

                    caching.available = ('caches' in window);

                    caching.installCache = function(namedCache, urlArray, urlImage = '/images/NAVCogs.png')
                    {
                        window.addEventListener('install', function(e)
                        {
                            e.waitUntil(caches.open(namedCache).then(function(cache) { return cache.addAll(urlArray); }));
                        });

                        window.addEventListener('fetch', function(e)
                        {
                            e.respondWith(caches.match(e.request).then(function(response)
                            {
                                if (response !== undefined)
                                {
                                    return response;

                                } else {

                                    return fetch(e.request).then(function (response)
                                    {
                                        let responseClone = response.clone();

                                        caches.open(namedCache).then(function (cache) { cache.put(e.request, responseClone); });

                                        return response;

                                    }).catch(function () {

                                        return caches.match(urlImage);

                                    });

                                }

                            }));

                        });

                    }

                })(); // end caching

                Object.freeze(caching);

                // generic resource allocation
                (function() {

                    const protean = {};
                    const resource = {};
                    const symbol = new Map();

                    initialise();

                    rsc.constant = protean; // exposed local scope attributes

                    Object.freeze(rsc.constant);

                    rsc.windowOpen = function(obj) { window.open(obj.element.getAttribute('src'), obj.type); }
                    rsc.isString = function(obj) { return Object.prototype.toString.call(obj) == '[object String]'; }
                    rsc.clearElement = function(el) { while (el.firstChild) el.removeChild(el.firstChild); }
                    rsc.getImportMetaUrl = function() { return import.meta.url; }

                    rsc.composeElement = function(el)
                    {
                        const precursor = el.parent;
                        const node = document.createElement(el.typeof);

                        if (el.id) node.setAttribute("id", el.id);
                        if (el.className) node.setAttribute("class", el.className);
                        if (el.onClick) node.setAttribute("onclick", el.onClick);
                        if (el.src) node.setAttribute("src", el.src);
                        if (el.alt) node.setAttribute("alt", el.alt);
                        if (el.markup) node.insertAdjacentHTML('afterbegin', el.markup);

                        precursor.appendChild(node);
                    }

                    rsc.setHorizontalSwipe = function(touch, callback, args)
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

                    rsc.isEmptyOrNull = function(obj)
                    {
                        if (obj === null || obj == 'undefined') return true;

                        if (rsc.isString(obj)) return (obj.length === 0 || !obj.trim());
                        if (Array.isArray(obj)) return (obj.length === 0);
                        if (obj && obj.constructor === Object) return (Object.keys(obj).length === 0);

                        return !obj;
                    }

                    rsc.getBooleanAttribute = function(attribute, locale = 'en')
                    {
                        if (attribute === true || attribute === false) return attribute;
                        if (rsc.isEmptyOrNull(attribute)) return false;
                        if (!rsc.isString(attribute)) return false;

                        const token = attribute.trim().toLocaleLowerCase(locale);

                        return symbol.get(token) || false;
                    }

                    rsc.getUniqueElementId = function(str = null, range = 100)
                    {
                        let elName = function() { return str + Math.floor(Math.random() * range) };
                        let el = null;

                        while (document.getElementById(el = elName())) {};

                        return el;
                    }

                    rsc.removeDuplcates = function(obj, sort)
                    {
                        const key = JSON.stringify;
                        let ar = [...new Map (obj.map(node => [key(node), node])).values()];

                        return sort ? ar.sort((a, b) => a - b) : ar;
                    }

                    rsc.inspect = function(diagnostic)
                    {
                        if (rsc.isEmptyOrNull(diagnostic)) return rsc.inspect({ type: protean.error, notification: resource.inspect });

                        const lookup = {
                            [protean.notify]: function() { if (diagnostic.logtrace) console.info(diagnostic.notification); },
                            [protean.error]: function() { rsc.errorHandler({ notification: diagnostic.notification, alert: diagnostic.logtrace } ); },
                            [protean.reference]: function() { if (diagnostic.logtrace) console.log('Reference: ' + protean.newline + protean.newline + diagnostic.reference); },
                            [protean.default]: function() { rsc.errorHandler({ notification: resource.errordefault, alert: diagnostic.logtrace } ); }
                        };

                        return lookup[diagnostic.type]() || lookup[protean.default];
                    }

                    rsc.errorHandler = function(error)
                    {
                        if (rsc.isEmptyOrNull(error)) return rsc.inspect({ type: protean.error, notification: resource.errorHandler });

                        const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
                        console.error(err);

                        if (error.alert) alert(err);

                        return false;
                    }

                    rsc.getObjectProperties = function(object, str = '')
                    {
                        for (let property in object) str += property + ': ' + object[property] + ', ';
                        return str.replace(/, +$/g,'');
                    }

                    function initialise()
                    {
                        symbol.set('true', true);
                        symbol.set('t', true);
                        symbol.set('yes', true);
                        symbol.set('y', true);
                        symbol.set('1', true);

                        protean.reference = 1;
                        protean.notify = 2;
                        protean.default = 98;
                        protean.error = 99;
                        protean.isWindows = (navigator.appVersion.indexOf('Win') != -1);
                        protean.newline = protean.isWindows ? '\r\n' : '\n';
                        protean.whitespace = /\s/g;

                        Object.freeze(protean);

                        resource.inspect = 'Error: An exception occurred in the inspect method.  The diagnostic argument was empty or null';
                        resource.errorhandler = 'Error: An exception occurred in the errorhandler method.  The error argument was empty or null';
                        resource.errordefault = 'An unexpected error has occurred. The inspection type was missing or invalid';

                        Object.freeze(resource);
                    }

                })(); // end resource allocation

                Object.freeze(rsc);

            }

        }

    }); // end HTMLElement extension

})();
