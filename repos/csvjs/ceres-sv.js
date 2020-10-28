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

import { resource as rsc, caching as ca } from './ceres-sv-lib.min.js';
import { cookies } from 'https://ceresbakalite.github.io/similarity/repos/mods/cereslibrary.min.js';

var ceres = {};
(function()
{
    'use strict';

    this.getImage = function(el) { rsc.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    this.getSlide = function(target, calc) { setSlide(csv.index = (calc) ? csv.index += target : target); };  // global scope method reference

    const csr = function() { return attribute; } // ceres slideview resource attributes

    const csv = new class // ceres slideview configuration attributes
    {
        constructor()
        {
            this.index = 1,
            this.config = function() { return attribute; }
        }

    }

    Object.seal(csv);

    csv.config.HTMLSlideViewElement = 'ceres-sv'; // required element name
    csv.config.HTMLScriptElementId = 'ceres-csv'; // optional markup noscript tag id when using an embedded image list
    csv.config.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.css'; // the default slideview stylesheet
    csv.config.enabledCSS = [];
    csv.config.enabledSRC = [];

    const el = document.querySelectorAll(csv.config.HTMLSlideViewElement);

    const slideView = function(el, index)
    {
        csv.config.node = index;

        window.customElements.get(csv.config.HTMLSlideViewElement) || window.customElements.define(csv.config.HTMLSlideViewElement, class extends HTMLElement
        {
            async connectedCallback()
            {
                csv.config.css = this.getAttribute('css') || csv.config.defaultCSS;
                csv.config.src = this.getAttribute('src') || null;

                if (csv.config.cssList = !rsc.isEmptyOrNull(csv.config.css)) await ( await fetchStylesheets(csv.config.css) );
                if (csv.config.callback = !rsc.isEmptyOrNull(csv.config.src)) this.insertAdjacentHTML('afterbegin', await ( await fetch(csv.config.src) ).text());

                csv.config.enabledSRC = rsc.removeDuplcates(csv.config.enabledSRC.concat(csv.config.src));

                if (slideviewHasAttributes()) activateSlideView();
            }

        });

    }

    if (!rsc.isEmptyOrNull(el)) el.forEach(slideView);

    const progenitor = function()
    {
        csv.config.progenitor = document.getElementById(csv.config.HTMLSlideViewElement) || document.getElementsByTagName(csv.config.HTMLSlideViewElement)[csv.config.node];

        const protean = !rsc.isEmptyOrNull(csv.config.progenitor);

        if (protean)
        {
            csv.config.progenitor.id = rsc.getUniqueElementId(csv.config.HTMLSlideViewElement);
            csv.config.HTMLScriptElement = document.getElementById(csv.config.HTMLScriptElementId) || document.getElementsByTagName('noscript')[csv.config.node];
            csv.config.ptr = !rsc.getBooleanAttribute(csv.config.progenitor.getAttribute('ptr'));
            csv.config.sur = !rsc.getBooleanAttribute(csv.config.progenitor.getAttribute('sur'));
            csv.config.sub = !rsc.getBooleanAttribute(csv.config.progenitor.getAttribute('sub'));
            csv.config.trace = rsc.getBooleanAttribute(csv.config.progenitor.getAttribute('trace'));
            csv.config.delay = Number.isInteger(parseInt(csv.config.progenitor.getAttribute('delay'))) ? parseInt(csv.config.progenitor.getAttribute('delay')) : 250;
        }

        return protean;
    }

    const precursor = function()
    {
        csr.ListContainerMarkup = 'Image list markup ' + ((csv.config.callback) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv.config.HTMLSlideViewElement + ']:' + rsc.constant.newline;
        csr.BodyContentList = 'The ' + csv.config.HTMLSlideViewElement + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
        csr.BodyContentListNotFound = 'Error: Unable to find the ' + csv.config.HTMLSlideViewElement + ' fallback noscript image list when searching the document body';
        csr.CSVObjectAttributes = 'The csv object attribute properties after initialisation [' + csv.config.HTMLSlideViewElement + ']: ';
        csr.ProgenitorNotFound = 'Error: Unable to find the ' + csv.config.HTMLSlideViewElement + ' document element';
        csr.ListContainerNotFound = 'Error: Unable to find either the connectedCallback ' + csv.config.HTMLSlideViewElement + ' attribute source nor the fallback noscript image list container';

        Object.freeze(csr);

        return (csv.config.callback || csv.config.HTMLScriptElement);
    }

    const attributesExist = function()
    {
        csv.config.imageArray = null;

        rsc.inspect({ type: rsc.constant.notify, notification: csr.CSVObjectAttributes + rsc.getObjectProperties(csv.config), logtrace: csv.config.trace });

        const getImageList = function()
        {
            const getConnectedCallbackList = function() { return (!rsc.isEmptyOrNull(csv.config.progenitor.textContent)) ? csv.config.progenitor.textContent : null; }

            const getBodyContentList = function()
            {
                rsc.inspect({ type: rsc.constant.notify, notification: csr.BodyContentList, logtrace: csv.config.trace });

                const list = !rsc.isEmptyOrNull(csv.config.HTMLScriptElement) ? csv.config.HTMLScriptElement.textContent : null;
                return !rsc.isEmptyOrNull(list) ? list : rsc.inspect({ type: rsc.constant.error, notification: csr.BodyContentListNotFound, logtrace: csv.config.trace });
            }

            return (csv.config.callback) ? getConnectedCallbackList() : getBodyContentList();
        }

        const isImageArray = function()
        {
            let imageList = getImageList();

            if (!rsc.isEmptyOrNull(imageList))
            {
                rsc.inspect({ type: rsc.constant.notify, notification: csr.ListContainerMarkup + imageList, logtrace: csv.config.trace });
                csv.config.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;
            }

            Object.freeze(csv.config);

            return !rsc.isEmptyOrNull(csv.config.imageArray);
        }

        return isImageArray();
    }

    const slideviewHasAttributes = function()
    {
        if (!progenitor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.ProgenitorNotFound, logtrace: csv.config.trace });
        if (!precursor()) return rsc.inspect({ type: rsc.constant.error, notification: csr.ListContainerNotFound, logtrace: csv.config.trace });

        return attributesExist();
    }

    function getSlideView()
    {
        const getURL = function() { return (!rsc.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null; }
        const getSurtitle = function() { return (csv.config.sur) ? imageIndex + ' / ' + csv.config.imageArray.length : null; }
        const getSubtitle = function() { return (csv.config.sub) ? getAccessibilityText() : null; }
        const getAccessibilityText = function() { return (!rsc.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null; }

        rsc.clearElement(csv.config.progenitor);

        const imageContainer = document.createElement('div');
        imageContainer.id = csv.config.HTMLSlideViewElement + '-image-container';
        csv.config.progenitor.appendChild(imageContainer);

        rsc.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

        for (let item = 0; item < csv.config.imageArray.length; item++)
        {
            var arrayItem = csv.config.imageArray[item].split(',');
            var imageIndex = item + 1;

            let id = 'slideview' + imageIndex;

            let elements = {
                'surName': 'slideview-sur' + imageIndex,
                'imgName': 'slideview-img' + imageIndex,
                'subName': 'slideview-sub' + imageIndex
            };

            rsc.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

            let slideContainer = document.getElementById(id);

            if (csv.config.sur) rsc.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
            rsc.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
            if (csv.config.sub) rsc.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
        }

        rsc.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEvent: 'window.getSlide(-1, true)' });
        rsc.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEvent: 'window.getSlide(1, true)' });

        if (csv.config.ptr) getSlideViewPointerContainer();

        rsc.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

        function getHorizontalSwipe(swipe)
        {
            const offset = (swipe.action) ? swipe.right : swipe.left;
            setSlide(csv.index = csv.index += offset);
        }

        rsc.inspect({ type: rsc.constant.notify, notification: csv.config.progenitor, logtrace: csv.config.trace });

        function getSlideViewPointerContainer()
        {
            const pointerElement = document.createElement('div');
            const getClickEvent = function() { return 'window.getSlide(' + pointerIndex + ')'; }

            pointerElement.id = csv.config.HTMLSlideViewElement + '-pointer-container';

            csv.config.progenitor.appendChild(document.createElement('br'));
            csv.config.progenitor.appendChild(pointerElement);

            rsc.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

            for (let item = 0; item < csv.config.imageArray.length; item++)
            {
                var pointerIndex = item + 1;
                rsc.composeElement({ el: 'span', id: 'slideview-ptr' + pointerIndex, classValue: 'ptr', parent: pointerElement, onClickEvent: getClickEvent() });
            }

            csv.config.progenitor.appendChild(document.createElement('br'));
        }

    }

    function fetchStylesheets(str)
    {
        const ar = csv.config.cssList ? str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';') : null;

        const setlink = function(url, index)
        {
            if (!csv.config.enabledCSS.includes(url)) rsc.composeLinkElement({ rel: 'stylesheet', type: 'text/css', href: url, media: 'screen' });
        }

        if (!rsc.isEmptyOrNull(ar)) ar.forEach(setlink);

        csv.config.enabledCSS = rsc.removeDuplcates(csv.config.enabledCSS.concat(ar));
    }

    function setSlide(targetIndex)
    {
        const slides = document.querySelectorAll('div.slideview');

        const setPointerStyle = function()
        {
            const pointers = document.querySelectorAll('span.ptr');
            const el = document.querySelector('span.active');

            if (el) el.className = 'ptr';
            pointers[csv.index-1].className += ' active';
        }

        csv.index = (targetIndex < 1) ? slides.length : (targetIndex > slides.length) ? 1 : csv.index;

        slides.forEach(node => { node.style.display = 'none'; } );
        slides[csv.index-1].style.display = 'block';

        if (csv.config.ptr) setPointerStyle();
    }

    function activateSlideView()
    {
        csv.config.progenitor.style.display = 'none';

        getSlideView();
        setSlide();
        setCache();

        setTimeout(function() { setSlideViewDisplay('block'); }, csv.config.delay);
    }


    function setSlideViewDisplay(attribute)
    {
        const nodelist = document.querySelectorAll('img.slide, #' + csv.config.progenitor.id);
        nodelist.forEach(node => { node.style.display = attribute; } );
    }

    function setCache()
    {
        const namedCache = csv.config.HTMLSlideViewElement + '-cache';

        const urlArray = [
            'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.min.js',
            'https://ceresbakalite.github.io/ceres-sv/prod/ceres-sv.lib.min.js'
        ];

        console.log(import.meta);

        //const ar = document.querySelectorAll('script');

        //let ar = rsc.removeDuplcates(csv.config.enabledCSS.concat(csv.config.enabledSRC.concat(urlArray)));

        //ar.forEach(url => console.log(url));

        if ('caches' in window) ca.installCache(namedCache, rsc.removeDuplcates(csv.config.enabledCSS.concat(csv.config.enabledSRC.concat(urlArray))));
    }


}).call(window);
