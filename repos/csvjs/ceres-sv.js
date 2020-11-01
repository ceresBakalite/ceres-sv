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
export { ceres };

import { resource as rsc, caching } from './ceres-sv-lib.min.js';
//import { resource as rsc, caching } from 'https://ceresbakalite.github.io/ceres-sv/repos/csvjs/ceres-sv-lib.js';

var ceres = {};
(function()
{
    'use strict';

    this.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    this.getSlide = function(target, calc) { config.bindSlide.call(config.slide = (calc) ? config.slide += target : target); };  // global scope method reference

    const csv = 'ceres-sv'; // required ceres slideview element name
    const config = new class { constructor() {} } // ceres slideview configuration attributes

    window.customElements.get(csv) || window.customElements.define(csv, class extends HTMLElement
    {
        async connectedCallback()
        {
            const cnv = 'ceres-csv'; // optional markup noscript tag id when using an embedded image list
            const csr = function() { return attribute; } // ceres slideview resource attributes

            if (!Object.isFrozen(csr)) getResources();

            config.cssStr = this.getAttribute('css') || config.defaultCSS;
            config.srcStr = this.getAttribute('src') || null;

            config.progenitor = this;
            config.fetchcss = !rsc.isEmptyOrNull(config.cssStr);
            config.callback = !rsc.isEmptyOrNull(config.cssSrc);

            config.slide = 1;

            if (config.fetchcss) await ( await fetchStylesheets(config.cssStr) );
            if (config.callback) this.insertAdjacentHTML('afterbegin', await ( await fetch(config.srcStr) ).text());

            config.cache.src = config.cache.src.concat(config.srcStr);

            if (slideviewHasAttributes()) activateSlideView();

            let precursor = function() { return config.callback || config.noscript; }

            let protean = function()
            {
                const exists = !rsc.isEmptyOrNull(config.progenitor);

                if (exists)
                {
                    config.progenitor.id = rsc.getUniqueElementId(csv);
                    config.noscript = document.getElementById(cnv) || document.getElementsByTagName('noscript')[0];

                    config.attributes.sur = rsc.getBooleanAttribute(config.progenitor.getAttribute('sur'));
                    config.attributes.sub = rsc.getBooleanAttribute(config.progenitor.getAttribute('sub'));
                    config.attributes.ptr = rsc.getBooleanAttribute(config.progenitor.getAttribute('ptr'));
                    config.attributes.trace = rsc.getBooleanAttribute(config.progenitor.getAttribute('trace'));
                    config.attributes.cache = !rsc.getBooleanAttribute(config.progenitor.getAttribute('cache')); // cache by default
                    config.attributes.delay = Number.isInteger(parseInt(config.progenitor.getAttribute('delay'))) ? parseInt(config.progenitor.getAttribute('delay')) : 250;
                }

                return exists;
            }

            let attributesExist = function()
            {
                config.imageArray = null;

                rsc.inspect({ type: rsc.constant.notify, notification: csr.configAttributes + rsc.getObjectProperties(config.attributes), logtrace: config.attributes.trace });

                const getImageList = function()
                {
                    let getConnectedCallbackList = function() { return (!rsc.isEmptyOrNull(config.progenitor.textContent)) ? config.progenitor.textContent : null; }

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
                config.bindSlide = setSlide.bind(ceres);
            }

            function slideviewHasAttributes()
            {
                if (!protean()) return rsc.inspect({ type: rsc.constant.error, notification: csr.progenitorError, logtrace: config.attributes.trace });
                if (!precursor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.imageListError, logtrace: config.attributes.trace });

                return attributesExist();
            }

            let fetchStyles = function()
            {
                var styles = null;

                config.cache.css = rsc.removeDuplcates(config.cssStr.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';'));

                const getStyles = function(url, index)
                {
                    console.log('getStyles: ' + url);
                    if (!config.cache.css.includes(url)) fetch(url).then(response => response.text()).then(str => { styles += str; });
                }

                if (!rsc.isEmptyOrNull(config.cache.css)) config.cache.css.forEach(getStyles);

                return styles;
            }

            function getSlideView()
            {
                let getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
                let getSurtitle = function() { return (config.attributes.sur) ? imageIndex + ' / ' + config.imageArray.length : null; }
                let getSubtitle = function() { return (config.attributes.sub) ? getAccessibilityText() : null; }
                let getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }

                rsc.clearElement(config.progenitor);

                config.progenitor.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'

                const styleContainer = document.createElement('style');
                styleContainer.id = csv + '-style-container';
                config.progenitor.appendChild(styleContainer);

                rsc.composeAttribute({ id: styleContainer.id, type: 'class', value: 'slideview-style' });

                let el = document.getElementById(styleContainer.id);
                el.insertAdjacentHTML('afterbegin', fetchStyles())

                const bodyContainer = document.createElement('div');
                bodyContainer.id = csv + '-body-container';
                config.progenitor.appendChild(bodyContainer);

                rsc.composeAttribute({ id: bodyContainer.id, type: 'class', value: 'slideview-body' });

                const imageContainer = document.createElement('div');
                imageContainer.id = csv + '-image-container';
                bodyContainer.appendChild(imageContainer);

                rsc.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

                for (let item = 0; item < config.imageArray.length; item++)
                {
                    var arrayItem = config.imageArray[item].split(',');
                    var imageIndex = item + 1;

                    let id = 'slideview' + imageIndex;

                    let elements = {
                        'surName': 'slideview-sur' + imageIndex,
                        'imgName': 'slideview-img' + imageIndex,
                        'subName': 'slideview-sub' + imageIndex
                    };

                    rsc.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

                    let slideContainer = document.getElementById(id);

                    if (config.attributes.sur) rsc.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
                    rsc.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
                    if (config.attributes.sub) rsc.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
                }

                rsc.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEvent: 'window.getSlide(-1, true)' });
                rsc.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEvent: 'window.getSlide(1, true)' });

                if (config.attributes.ptr) getSlideViewPointerContainer();

                rsc.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

                config.progenitor.shadowRoot.append(styleContainer);
                config.progenitor.shadowRoot.append(bodyContainer);

                function getHorizontalSwipe(swipe)
                {
                    const offset = (swipe.action) ? swipe.right : swipe.left;
                    setSlide(config.slide = config.slide += offset);
                }

                rsc.inspect({ type: rsc.constant.notify, notification: config.progenitor, logtrace: config.attributes.trace });

                function getSlideViewPointerContainer()
                {
                    const pointerElement = document.createElement('div');
                    const getClickEvent = function() { return 'window.getSlide(' + pointerIndex + ')'; }

                    pointerElement.id = csv + '-pointer-container';
                    bodyContainer.appendChild(pointerElement);

                    rsc.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

                    for (let item = 0; item < config.imageArray.length; item++)
                    {
                        var pointerIndex = item + 1;
                        rsc.composeElement({ el: 'span', id: 'slideview-ptr' + pointerIndex, classValue: 'ptr', parent: pointerElement, onClickEvent: getClickEvent() });
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

            function setSlide()
            {
                const slides = document.querySelectorAll('div.slideview');

                const setPointerStyle = function()
                {
                    const pointers = document.querySelectorAll('span.ptr');
                    const el = document.querySelector('span.active');

                    if (el) el.className = 'ptr';
                    pointers[config.slide-1].className += ' active';
                }

                config.slide = (config.slide < 1) ? slides.length : (config.slide > slides.length) ? 1 : config.slide;

                slides.forEach(node => { node.style.display = 'none'; } );
                slides[config.slide-1].style.display = 'block';

                if (config.attributes.ptr) setPointerStyle();
            }

            function activateSlideView()
            {
                config.progenitor.style.display = 'none';

                getSlideView();
                setSlide();

                setTimeout(function() { setSlideViewDisplay('block'); }, config.attributes.delay);

                if (config.attributes.cache) setCache();
            }


            function setSlideViewDisplay(attribute)
            {
                const nodelist = document.querySelectorAll('img.slide, #' + config.progenitor.id);
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

}).call(window);
