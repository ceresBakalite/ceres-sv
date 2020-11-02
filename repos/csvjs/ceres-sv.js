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

//export { ceres };

import { resource as rsc } from './ceres-sv-lib.min.js';
//import { resource as rsc, caching } from 'https://ceresbakalite.github.io/ceres-sv/repos/csvjs/ceres-sv-lib.js';

window.ceres = {};
(function()
{
    'use strict';

    const csv = 'ceres-sv'; // required ceres slideview element name

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
        async connectedCallback()
        {
            const progenitor = this;

            const config = new class { constructor() {} } // ceres slideview configuration attributes
            const csr = function() { return attribute; } // ceres slideview resource attributes
            const cnv = 'ceres-csv'; // optional markup noscript tag id when using an embedded image list
            const cls = new Map();

            ceres.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
            ceres.getSlide = function(el) { setSlide(slideIndex(el)); };  // global scope method reference

            if (!Object.isFrozen(csr)) getResources();

            let css = progenitor.getAttribute('css') || config.defaultCSS;
            let src = progenitor.getAttribute('src') || null;

            config.fetchcss = !rsc.isEmptyOrNull(css);
            config.callback = !rsc.isEmptyOrNull(src);

            config.slide = 1;

            //if (config.fetchcss) await ( await fetchStylesheets(css) );
            if (config.callback) progenitor.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            config.cache.src = config.cache.src.concat(src);

            if (slideviewHasAttributes()) activateSlideView();

            let precursor = function() { return config.callback || config.noscript; }

            let protean = function()
            {
                const exists = !rsc.isEmptyOrNull(config.progenitor);

                if (exists)
                {
                    progenitor.id = rsc.getUniqueElementId(csv);
                    config.noscript = document.getElementById(cnv) || document.getElementsByTagName('noscript')[0];

                    config.attributes.sur = rsc.getBooleanAttribute(progenitor.getAttribute('sur')); // disabled
                    config.attributes.sub = rsc.getBooleanAttribute(progenitor.getAttribute('sub')); // disabled
                    config.attributes.trace = rsc.getBooleanAttribute(progenitor.getAttribute('trace')); // disabled
                    config.attributes.delay = Number.isInteger(parseInt(progenitor.getAttribute('delay'))) ? parseInt(progenitor.getAttribute('delay')) : 250;
                    config.attributes.cache = !rsc.getBooleanAttribute(progenitor.getAttribute('cache')); // enabled
                    config.attributes.nub = !rsc.getBooleanAttribute(progenitor.getAttribute('nub')); // enabled
                }

                return exists;
            }

            let attributesExist = function()
            {
                config.imageArray = null;

                rsc.inspect({ type: rsc.constant.notify, notification: csr.configAttributes + rsc.getObjectProperties(config.attributes), logtrace: config.attributes.trace });

                const getImageList = function()
                {
                    let getConnectedCallbackList = function() { return (!rsc.isEmptyOrNull(progenitor.textContent)) ? progenitor.textContent : null; }

                    let getBodyContentList = function()
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.noscriptSearch, logtrace: config.attributes.trace });

                        const list = !rsc.isEmptyOrNull(config.noscript) ? config.noscript.textContent : null;
                        return !rsc.isEmptyOrNull(list) ? list : rsc.inspect({ type: rsc.constant.error, notification: csr.noscriptError, logtrace: config.attributes.trace });
                    }

                    return config.callback ? getConnectedCallbackList() : getBodyContentList();
                }

                const isImageArray = function()
                {
                    let imageList = getImageList();

                    if (!rsc.isEmptyOrNull(imageList))
                    {
                        rsc.inspect({ type: rsc.constant.notify, notification: csr.imageMarkup + ' [' + (config.callback ? csv + ' - callback' : cnv + ' - noscript') + ']:' + rsc.constant.newline + imageList, logtrace: config.attributes.trace });
                        config.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
                    }

                    if (!Object.isSealed(config)) Object.seal(config);

                    return !rsc.isEmptyOrNull(config.imageArray);
                }

                return isImageArray();
            }

            function getResources()
            {
                csr.imageMarkup = 'Image list markup';
                csr.configAttributes = 'The ' + csv + ' element attributes after initialisation: ';
                csr.noscriptSearch = 'The ' + csv + ' src attribute url is unavailable. Searching for the fallback noscript element in the document body';
                csr.progenitorError = 'Error: Unable to find the ' + csv + ' document element';
                csr.imageListError = 'Error: Unable to find either the callback ' + csv + ' nor the fallback noscript ' + cnv + ' elements';
                csr.noscriptError = 'Error: Unable to find the ' + cnv + ' fallback noscript element when searching the document body';

                Object.freeze(csr);

                config.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
                config.attributes = function() { return attribute; }
                config.cache = function() { return attribute; }
                config.cache.css = [];
                config.cache.src = [];
            }

            function slideviewHasAttributes()
            {
                if (!protean()) return rsc.inspect({ type: rsc.constant.error, notification: csr.progenitorError, logtrace: config.attributes.trace });
                if (!precursor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.imageListError, logtrace: config.attributes.trace });

                return attributesExist();
            }

            function getSlideView()
            {
                let getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
                let getSurtitle = function() { return (config.attributes.sur) ? imageIndex + ' / ' + config.imageArray.length : null; }
                let getSubtitle = function() { return (config.attributes.sub) ? getAccessibilityText() : null; }
                let getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }

                rsc.clearElement(config.progenitor);

                progenitor.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

                const styleContainer = document.createElement('style');
                styleContainer.id = csv + '-style';
                styleContainer.className = 'slideview-style';

                progenitor.appendChild(styleContainer);

                fetch(config.defaultCSS).then(response => response.text()).then(str =>
                {
                    styleContainer.insertAdjacentHTML('afterbegin', str)
                });

                const bodyContainer = document.createElement('div');
                bodyContainer.id = csv + '-body';
                bodyContainer.className = 'slideview-body';
                bodyContainer.style.display  = 'none';

                progenitor.appendChild(bodyContainer);

                const imageContainer = document.createElement('div');
                imageContainer.id = csv + '-image';
                imageContainer.className = 'slideview-image';

                bodyContainer.appendChild(imageContainer);

                for (let item = 0; item < config.imageArray.length; item++)
                {
                    var arrayItem = config.imageArray[item].split(',');
                    var imageIndex = item + 1;

                    let id = csv + imageIndex;

                    let elements = {
                        'surName': csv + '-sur' + imageIndex,
                        'imgName': csv + '-img' + imageIndex,
                        'subName': csv + '-sub' + imageIndex
                    };

                    let slideContainer = document.createElement('div');
                    slideContainer.className = 'view fade';

                    imageContainer.appendChild(slideContainer);

                    if (config.attributes.sur) rsc.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
                    rsc.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'ceres.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
                    if (config.attributes.sub) rsc.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
                }

                rsc.composeElement({ el: 'a', id: csv + '-left', classValue: 'left', parent: imageContainer, markup: '&#10094;', onClickEvent: 'ceres.getSlide(this)' });
                rsc.composeElement({ el: 'a', id: csv + '-right', classValue: 'right', parent: imageContainer, markup: '&#10095;', onClickEvent: 'ceres.getSlide(this)' });

                if (config.attributes.nub) getSlideViewTrackContainer();

                rsc.setHorizontalSwipe( { act: 80, el: 'div.slideview-image' }, getHorizontalSwipe, { left: -1, right: 1 } );

                progenitor.shadowRoot.append(styleContainer);
                progenitor.shadowRoot.append(bodyContainer);

                function getHorizontalSwipe(swipe)
                {
                    const offset = (swipe.action) ? swipe.right : swipe.left;
                    setSlide(config.slide = config.slide += offset);
                }

                rsc.inspect({ type: rsc.constant.notify, notification: config.progenitor, logtrace: config.attributes.trace });

                function getSlideViewTrackContainer()
                {
                    const getClickEvent = function() { return 'ceres.getSlide(this)'; }

                    const trackContainer = document.createElement('div');
                    trackContainer.id = csv + '-nub';
                    trackContainer.className = 'slideview-nub';

                    bodyContainer.appendChild(trackContainer);

                    for (let item = 0; item < config.imageArray.length; item++)
                    {
                        var index = item + 1;
                        rsc.composeElement({ el: 'span', id: 'nub' + index, classValue: 'nub', parent: trackContainer, onClickEvent: getClickEvent() });
                    }

                    bodyContainer.appendChild(document.createElement('br'));
                }

            }

            function fetchStylesheets(str)
            {
                const css = str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';');

                const setlink = function(url, index)
                {
                    if (!config.cache.css.includes(url)) rsc.composeLinkElement({ rel: 'stylesheet', type: 'text/css', href: url, media: 'screen' });
                }

                if (!rsc.isEmptyOrNull(css)) css.forEach(setlink);

                config.cache.css = config.cache.css.concat(css);
            }

            const slideIndex = function (el)
            {
                cls.set('left', config.slide - 1);
                cls.set('right', config.slide + 1);
                cls.set('nub', Number.parseInt(el.id.replace('nub', ''), 10));

                config.slide = cls.get(el.className);
            }

            function setSlide()
            {
                const shadow = progenitor.shadowRoot;
                const slides = shadow.querySelectorAll('div.view');

                const setNubStyle = function()
                {
                    const elements = shadow.querySelectorAll('span.nub');
                    const el = shadow.querySelector('span.enabled');

                    if (el) el.className = 'nub';
                    elements[config.slide-1].className += ' enabled';
                }

                config.slide = (config.slide < 1) ? slides.length : (config.slide > slides.length) ? 1 : config.slide;

                slides.forEach(node => { node.style.display = 'none'; } );
                slides[config.slide-1].style.display = 'block';

                if (config.attributes.nub) setNubStyle();
            }

            function activateSlideView()
            {
                progenitor.style.display = 'none';

                getSlideView();
                setSlide();

                setTimeout(function() { setSlideViewDisplay('block'); }, config.attributes.delay);

                if (config.attributes.cache) setCache();
            }


            function setSlideViewDisplay(attribute)
            {
                progenitor.style.display = 'block';

                const shadow = progenitor.shadowRoot;
                const nodelist = shadow.querySelectorAll('div.slideview-body, img.slide, #' + progenitor.id);

                nodelist.forEach(node => { node.style.display = attribute; } );
            }

            function setCache()
            {
                const cacheName = csv + '-cache';
                config.cache.script = [ import.meta.url, rsc.getImportMetaUrl() ];

                if (caching.available) caching.installCache(cacheName, rsc.removeDuplcates(config.cache.css.concat(config.cache.src.concat(config.cache.script))));
            }

        }

    }); // end HTMLElement extension

})();

window.caching = {};
(function(cache) {

    'use strict';

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

})();
