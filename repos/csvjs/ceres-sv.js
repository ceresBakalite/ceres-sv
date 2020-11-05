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

            const progenitor = this;

            const cfg = new Object(); // ceres slideview configuration attributes
            const csr = new Object(); // ceres slideview resource attributes
            const cls = new Map();

            initialise();

            let caching = {};
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

            let rsc = {}; // generic resource method allocation
            (function() {

                const protean = new Object();
                const resource = new Object();
                const symbol = new Map();

                initialise();

                rsc.constant = protean; // exposed local scope attributes

                Object.freeze(rsc.constant);

                rsc.windowOpen = function(obj) { window.open(obj.element.getAttribute('src'), obj.type); }
                rsc.isString = function(obj) { return Object.prototype.toString.call(obj) == '[object String]'; }
                rsc.clearElement = function(el) { while (el.firstChild) el.removeChild(el.firstChild); }
                rsc.getImportMetaUrl = function() { return import.meta.url; }

                rsc.setHorizontalSwipe = function(touch, callback, args)
                {
                    const el = document.querySelector(touch.selector);

                    if (!touch.act) touch.act = 10;

                    el.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; }, { passive: true } );
                    el.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: true });
                    el.addEventListener('touchend', e =>
                    {
                        touch.end = e.changedTouches[0].screenX;

                        if (Math.abs(touch.start - touch.end) > touch.act)
                        {
                            args.action = (touch.start > touch.end);
                            callback.call(this, args);
                        }

                    }, { passive: true });

                }

                rsc.composeElement = function(el)
                {
                    const precursor = el.parent;
                    const node = document.createElement(el.node);

                    if (el.id) node.setAttribute("id", el.id);
                    if (el.className) node.setAttribute("class", el.className);
                    if (el.onClick) node.setAttribute("onclick", el.onClick);
                    if (el.src) node.setAttribute("src", el.src);
                    if (el.alt) node.setAttribute("alt", el.alt);
                    if (el.markup) node.insertAdjacentHTML('afterbegin', el.markup);

                    precursor.appendChild(node);
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

                    Object.freeze(protean);

                    resource.inspect = 'Error: An exception occurred in the inspect method.  The diagnostic argument was empty or null';
                    resource.errorhandler = 'Error: An exception occurred in the errorhandler method.  The error argument was empty or null';
                    resource.errordefault = 'An unexpected error has occurred. The inspection type was missing or invalid';

                    Object.freeze(resource);
                }

            })(); // end resource allocation

            let css = progenitor.getAttribute('css') || cfg.defaultCSS;
            let src = progenitor.getAttribute('src') || null;

            cfg.fetchcss = !rsc.isEmptyOrNull(css);
            cfg.callback = !rsc.isEmptyOrNull(src);

            if (cfg.fetchcss) await ( await fetchStylesheets(css) );
            if (cfg.callback) progenitor.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            cfg.cache.src = cfg.cache.src.concat(src);

            if (slideviewHasAttributes()) activateSlideView();

            let precursor = function() { return cfg.callback || cfg.noscript; }

            let shadowSlide = function (node)
            {
                const root = node.getRootNode().host;
                const shade = document.querySelector('#' + root.id);
                const shadow = shade.shadowRoot;
                const slide = shadow.querySelector('div.slideview-image > div.pointer');

                cfg.slide = Number.parseInt(slide.id.replace('img', ''), 10);

                cls.set('left', cfg.slide - 1);
                cls.set('right', cfg.slide + 1);
                cls.set('nub', Number.parseInt(node.id.replace('nub', ''), 10));

                cfg.slide = cls.get(node.className);

                return shadow;
            }

            let protean = function()
            {
                const exists = !rsc.isEmptyOrNull(progenitor);

                if (exists)
                {
                    progenitor.id = rsc.getUniqueElementId(csv, 1000);
                    progenitor.setAttribute("class", 'delay');

                    cfg.noscript = document.getElementById(cns) || document.getElementsByTagName('noscript')[0];

                    cfg.attrib.sur = rsc.getBooleanAttribute(progenitor.getAttribute('sur')); // disabled
                    cfg.attrib.sub = rsc.getBooleanAttribute(progenitor.getAttribute('sub')); // disabled
                    cfg.attrib.trace = rsc.getBooleanAttribute(progenitor.getAttribute('trace')); // disabled
                    cfg.attrib.delay = Number.isInteger(parseInt(progenitor.getAttribute('delay'))) ? parseInt(progenitor.getAttribute('delay')) : 250;
                    cfg.attrib.cache = !rsc.getBooleanAttribute(progenitor.getAttribute('cache')); // enabled
                    cfg.attrib.nub = !rsc.getBooleanAttribute(progenitor.getAttribute('nub')); // enabled
                }

                return exists;
            }

            let attributesExist = function()
            {
                cfg.imageArray = null;

                rsc.inspect({ type: rsc.constant.notify, notification: csr.configAttributes + rsc.getObjectProperties(cfg.attrib), logtrace: cfg.attrib.trace });

                const getImageList = function()
                {
                    let getConnectedCallbackList = function() { return (!rsc.isEmptyOrNull(progenitor.textContent)) ? progenitor.textContent : null; }

                    let getBodyContentList = function()
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.noscriptSearch, logtrace: cfg.attrib.trace });

                        const list = !rsc.isEmptyOrNull(cfg.noscript) ? cfg.noscript.textContent : null;
                        return !rsc.isEmptyOrNull(list) ? list : rsc.inspect({ type: rsc.constant.error, notification: csr.noscriptError, logtrace: cfg.attrib.trace });
                    }

                    return cfg.callback ? getConnectedCallbackList() : getBodyContentList();
                }

                const isImageArray = function()
                {
                    let imageList = getImageList();

                    if (!rsc.isEmptyOrNull(imageList))
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.imageMarkup + ' [' + (cfg.callback ? csv + ' - callback' : cns + ' - noscript') + ']:' + rsc.constant.newline + imageList, logtrace: cfg.attrib.trace });
                        cfg.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                    }

                    if (!Object.isSealed(cfg)) Object.seal(cfg);

                    return !rsc.isEmptyOrNull(cfg.imageArray);
                }

                return isImageArray();
            }

            function initialise()
            {
                csr.imageMarkup = 'Image list markup';
                csr.configAttributes = 'The ' + csv + ' element attributes after initialisation: ';
                csr.noscriptSearch = 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback noscript element in the document body';
                csr.progenitorError = 'Error: Unable to find the ' + csv + ' document element';
                csr.imageListError = 'Error: Unable to find either the callback ' + csv + ' nor the fallback noscript ' + cns + ' elements';
                csr.noscriptError = 'Error: Unable to find the ' + cns + ' fallback noscript element when searching the document body';

                Object.freeze(csr);

                cfg.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                cfg.attrib = new Object();
                cfg.cache = new Object();
                cfg.cache.css = [];
                cfg.cache.src = [];
                cfg.slide = 1;
            }

            function slideviewHasAttributes()
            {
                if (!protean()) return rsc.inspect({ type: rsc.constant.error, notification: csr.progenitorError, logtrace: cfg.attrib.trace });
                if (!precursor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.imageListError, logtrace: cfg.attrib.trace });

                return attributesExist();
            }

            function getSlideView()
            {
                let getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
                let getSurtitle = function() { return (cfg.attrib.sur) ? imageIndex + ' / ' + cfg.imageArray.length : null; }
                let getSubtitle = function() { return (cfg.attrib.sub) ? getAccessibilityText() : null; }
                let getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }
                let setTrackId = function(index) { return 'nub' + index; }

                cfg.attrib.shade = document.querySelector('#' + progenitor.id);

                rsc.clearElement(cfg.attrib.shade);

                cfg.attrib.shade.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

                const styleContainer = document.createElement('style');
                styleContainer.id = csv + '-style';
                styleContainer.className = 'slideview-style';

                cfg.attrib.shade.appendChild(styleContainer);

                cfg.cache.css.forEach(item =>
                {
                    fetch(item).then(response => response.text()).then(str =>
                    {
                        styleContainer.insertAdjacentHTML('beforeend', str)
                    });

                });

                const bodyContainer = document.createElement('div');
                bodyContainer.id = csv + '-body';
                bodyContainer.className = 'slideview-body';
                bodyContainer.style.display  = 'none';

                cfg.attrib.shade.appendChild(bodyContainer);

                const imageContainer = document.createElement('div');
                imageContainer.id = csv + '-image';
                imageContainer.className = 'slideview-image';

                bodyContainer.appendChild(imageContainer);

                for (let item = 0; item < cfg.imageArray.length; item++)
                {
                    var arrayItem = cfg.imageArray[item].split(',');
                    var imageIndex = item + 1;

                    let el = {
                        'surName': csv + '-sur' + imageIndex,
                        'imgName': csv + '-img' + imageIndex,
                        'subName': csv + '-sub' + imageIndex
                    };

                    let slideContainer = document.createElement('div');
                    slideContainer.id = 'img' + imageIndex;
                    slideContainer.className = 'view fade none';

                    imageContainer.appendChild(slideContainer);

                    if (cfg.attrib.sur) rsc.composeElement({ node: 'div', id: el.surName, className: 'surtitle', parent: slideContainer, markup: getSurtitle() });
                    rsc.composeElement({ node: 'img', id: el.imgName, className: 'slide', parent: slideContainer, onClick: 'ceres.getImage(this);', src: getURL(), alt: getAccessibilityText() });
                    if (cfg.attrib.sub) rsc.composeElement({ node: 'div', id: el.subName, className: 'subtitle', parent: slideContainer, markup: getSubtitle() });
                }

                rsc.composeElement({ node: 'a', className: 'left', parent: imageContainer, markup: '&#10094;', onClick: 'ceres.getSlide(this)' });
                rsc.composeElement({ node: 'a', className: 'right', parent: imageContainer, markup: '&#10095;', onClick: 'ceres.getSlide(this)' });

                if (cfg.attrib.nub) getSlideViewTrackContainer();

                rsc.setHorizontalSwipe( { act: 80, selector: 'div.slideview-body > div.slideview-image' }, getHorizontalSwipe, { left: -1, right: 1 } );

                cfg.attrib.shade.shadowRoot.append(styleContainer);
                cfg.attrib.shade.shadowRoot.append(bodyContainer);

                function getHorizontalSwipe(swipe)
                {
                    const offset = (swipe.action) ? swipe.right : swipe.left;
                    cfg.slide = cfg.slide += offset;

                    //const shadowId = csv + ar[1];
                    //const shade = document.querySelector('#' + shadowId);
                    //const shadow = shade.shadowRoot;
                    //const slide = shadow.querySelector('div.pointer');

                    setSlide(cfg.slide = cfg.slide += offset);
                }

                rsc.inspect({ type: rsc.constant.notify, notification: cfg.attrib.shade, logtrace: cfg.attrib.trace });

                function getSlideViewTrackContainer()
                {
                    const getClickEvent = function() { return 'ceres.getSlide(this)'; }

                    const trackContainer = document.createElement('div');
                    trackContainer.id = csv + '-nub';
                    trackContainer.className = 'slideview-nub';

                    bodyContainer.appendChild(trackContainer);

                    for (let item = 0; item < cfg.imageArray.length; item++)
                    {
                        var index = item + 1;
                        rsc.composeElement({ node: 'span', id: setTrackId(index), className: 'nub', parent: trackContainer, onClick: getClickEvent() });
                    }

                }

            }

            function fetchStylesheets(str)
            {
                const css = str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';');
                cfg.cache.css = rsc.removeDuplcates(cfg.cache.css.concat(css));
            }

            function setSlide(node)
            {
                const shadow = rsc.isEmptyOrNull(node) ? cfg.attrib.shade.shadowRoot : shadowSlide(node);
                const slides = shadow.querySelectorAll('div.slideview-image > div.view');

                const setNubStyle = function()
                {
                    const elements = shadow.querySelectorAll('div.slideview-nub > span.nub');
                    const el = shadow.querySelector('div.slideview-nub > span.enabled');

                    if (el) el.className = 'nub';
                    elements[enable].className = 'nub enabled';
                }

                cfg.slide = (cfg.slide < 1) ? slides.length : (cfg.slide > slides.length) ? 1 : cfg.slide;

                const enable = cfg.slide-1;

                const el = shadow.querySelector('div.slideview-image > div.pointer');
                if (el) el.className = 'view fade none';
                slides[enable].className = 'view fade pointer'

                if (cfg.attrib.nub) setNubStyle();
            }

            function activateSlideView()
            {
                let setSlideViewDisplay = function(attribute)
                {
                    const shadow = cfg.attrib.shade.shadowRoot;
                    const node = shadow.querySelector('div.slideview-body');

                    node.style.display = attribute;
                }

                let setCache = function()
                {
                    const cacheName = csv + '-cache';
                    cfg.cache.script = [ import.meta.url, rsc.getImportMetaUrl() ];

                    if (caching.available) caching.installCache(cacheName, rsc.removeDuplcates(cfg.cache.css.concat(cfg.cache.src.concat(cfg.cache.script))));
                }

                getSlideView();
                setSlide();

                setTimeout(function() { setSlideViewDisplay('block'); }, cfg.attrib.delay);

                if (cfg.attrib.cache) setCache();
            }

        }

    }); // end HTMLElement extension

})();
