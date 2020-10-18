export { ceres }

import { cereslibrary as csl } from 'https://ceresbakalite.github.io/ceres-sv/repos/csvjs/mod/ceres-sv-lib.js';

var ceres = {};
(function()
{
    'use strict';

    this.getImage = function(el) { csl.windowOpen({ element: el, type: 'image' }); }; // global scope method reference
    this.getSlide = function(target, calc) { setSlide(csv.index = (calc) ? csv.index += target : target); };  // global scope method reference

    class Component
    {
        constructor()
        {
            this.type = function() { return type; },
            this.attribute = function() { return attribute; }
        }

    }

    class Slideviewer
    {
        constructor()
        {
            this.progenitor = null,
            this.listElement = null,
            this.imageArray = [],
            this.attribute = function() { return attribute; },
            this.cssarray = false,
            this.callback = false,
            this.index = 1
        }

    }

    let resource = new Component();
    let csv = new Slideviewer();

    Object.seal(resource);
    Object.seal(csv);

    csv.attribute.HTMLSlideViewElement = 'ceres-sv'; // required element name
    csv.attribute.HTMLImageListElement = 'ceres-csv'; // optional markup noscript tag id when using embedded image lists
    csv.attribute.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/repos/stylesheets/ceres-sv.css'; // the default slideview stylesheet

    window.customElements.get(csv.attribute.HTMLSlideViewElement) || window.customElements.define(csv.attribute.HTMLSlideViewElement, class extends HTMLElement
    {
        async connectedCallback()
        {
            const css = this.getAttribute('css') ? this.getAttribute('css') : csv.attribute.defaultCSS;
            const src = this.getAttribute('src') ? this.getAttribute('src') : null;

            csv.cssarray = !csl.isEmptyOrNull(css);
            csv.callback = !csl.isEmptyOrNull(src);

            if (csv.cssarray) await ( await fetchStylesheets(css) );
            if (csv.callback) this.insertAdjacentHTML('afterbegin', await ( await fetch(src) ).text());

            if (getSlideviewAttributes()) activateSlideView();
        }

    });

    let isProgenitor = function()
    {
        csv.progenitor = (document.getElementById(csv.attribute.HTMLSlideViewElement)) ? document.getElementById(csv.attribute.HTMLSlideViewElement) : document.getElementsByTagName(csv.attribute.HTMLSlideViewElement)[0];
        return !csl.isEmptyOrNull(csv.progenitor);
    }

    function getSlideviewAttributes()
    {
        if (!isProgenitor()) return csl.inspect({ type: csl.constant.error, notification: 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' document element' });
        if (!getAttributePrecursors()) return csl.inspect({ type: csl.constant.error, notification: resource.attribute.ListContainerNotFound, logtrace: csv.attribute.trace });

        return getImageArray();

        function getAttributePrecursors()
        {
            csv.progenitor.id = csv.attribute.HTMLSlideViewElement;
            csv.listElement = document.getElementById(csv.attribute.HTMLImageListElement) ? document.getElementById(csv.attribute.HTMLImageListElement) : document.getElementsByTagName('noscript')[0];

            csv.attribute.ptr = !csl.getBooleanAttribute(csv.progenitor.getAttribute('ptr'));
            csv.attribute.sur = !csl.getBooleanAttribute(csv.progenitor.getAttribute('sur'));
            csv.attribute.sub = !csl.getBooleanAttribute(csv.progenitor.getAttribute('sub'));
            csv.attribute.trace = csl.getBooleanAttribute(csv.progenitor.getAttribute('trace'));
            csv.attribute.delay = Number.isInteger(parseInt(csv.progenitor.getAttribute('delay'))) ? parseInt(csv.progenitor.getAttribute('delay')) : 500;

            Object.freeze(csv.attribute);

            resource.attribute.ProgenitorInnerHTML = 'Progenitor innerHTML [' + csv.attribute.HTMLSlideViewElement + ']: ' + csl.constant.newline + csl.constant.newline;
            resource.attribute.ListContainerMarkup = 'Image list markup ' + ((csv.callback) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv.attribute.HTMLSlideViewElement + ']:' + csl.constant.newline;
            resource.attribute.BodyContentList = 'The ' + csv.attribute.HTMLSlideViewElement + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
            resource.attribute.BodyContentListNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' fallback noscript image list when searching the document body';
            resource.attribute.CSVObjectAttributes = 'The csv object attribute properties after initialisation [' + csv.attribute.HTMLSlideViewElement + ']: ';
            resource.attribute.ListContainerNotFound = 'Error: Unable to find either the connectedCallback ' + csv.attribute.HTMLSlideViewElement + ' attribute source nor the fallback noscript image list container';

            Object.freeze(resource.attribute);

            return (csv.callback || csv.listElement);
        }

        function getImageArray()
        {
            csl.inspect({ type: csl.constant.notify, notification: resource.attribute.CSVObjectAttributes + csl.getObjectProperties(csv.attribute), logtrace: csv.attribute.trace });

            let imageList = getImageList();
            if (imageList) csl.inspect({ type: csl.constant.notify, notification: resource.attribute.ListContainerMarkup + imageList, logtrace: csv.attribute.trace });

            csv.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;

            return !csl.isEmptyOrNull(csv.imageArray);

            function getImageList()
            {
                return (csv.callback) ? getConnectedCallbackList() : getBodyContentList();

                function getConnectedCallbackList()
                {
                    return (!csl.isEmptyOrNull(csv.progenitor.textContent)) ? csv.progenitor.textContent : null;
                }

                function getBodyContentList()
                {
                    csl.inspect({ type: csl.constant.notify, notification: resource.attribute.BodyContentList, logtrace: csv.attribute.trace });

                    const list = !csl.isEmptyOrNull(csv.listElement) ? csv.listElement.textContent : null;
                    return !csl.isEmptyOrNull(list) ? list : csl.inspect({ type: csl.constant.error, notification: resource.attribute.BodyContentListNotFound, logtrace: csv.attribute.trace });
                }

            }

        }

    }

    function getSlideView()
    {
        csl.clearElement(csv.progenitor);

        const imageContainer = document.createElement('div');
        imageContainer.id = csv.attribute.HTMLSlideViewElement + '-image-container';
        csv.progenitor.appendChild(imageContainer);

        csl.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

        for (let item = 0; item < csv.imageArray.length; item++)
        {
            var arrayItem = csv.imageArray[item].split(',');
            var imageIndex = item + 1;

            let id = 'slideview' + imageIndex;

            let elements = {
                'surName': 'slideview-sur' + imageIndex,
                'imgName': 'slideview-img' + imageIndex,
                'subName': 'slideview-sub' + imageIndex
            };

            csl.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

            let slideContainer = document.getElementById(id);

            if (csv.attribute.sur) csl.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle() });
            csl.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEvent: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
            if (csv.attribute.sub) csl.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
        }

        csl.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEvent: 'window.getSlide(-1, true)' });
        csl.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEvent: 'window.getSlide(1, true)' });

        if (csv.attribute.ptr) getSlideViewPointerContainer();

        setSlideViewDisplay('none');

        csl.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

        function getHorizontalSwipe(swipe)
        {
            const offset = (swipe.action) ? swipe.right : swipe.left;
            setSlide(csv.index = csv.index += offset);
        }

        csl.inspect({ type: csl.constant.notify, notification: csv.progenitor, logtrace: csv.attribute.trace });

        function getSlideViewPointerContainer()
        {
            csv.progenitor.appendChild(document.createElement('br'));

            const pointerElement = document.createElement('div');

            pointerElement.id = csv.attribute.HTMLSlideViewElement + '-pointer-container';
            csv.progenitor.appendChild(pointerElement);

            csl.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

            for (let item = 0; item < csv.imageArray.length; item++)
            {
                var pointerIndex = item + 1;
                let pointerName = 'slideview-ptr' + pointerIndex;

                csl.composeElement({ el: 'span', id: pointerName, classValue: 'ptr', parent: pointerElement, onClickEvent: getClickEvent() });
            }

            csv.progenitor.appendChild(document.createElement('br'));

            function getClickEvent()
            {
                return 'window.getSlide(' + pointerIndex + ')';
            }

        }

        function getURL()
        {
            return (!csl.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null;
        }

        function getSurtitle()
        {
            return (csv.attribute.sur) ? imageIndex + ' / ' + csv.imageArray.length : null;
        }

        function getSubtitle()
        {
            return (csv.attribute.sub) ? getAccessibilityText() : null;
        }

        function getAccessibilityText()
        {
            return (!csl.isEmptyOrNull(arrayItem[1])) ? arrayItem[1].trim() : null;
        }

    }

    function fetchStylesheets(arrayString)
    {
        const cssArray = csv.cssarray ? arrayString.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';') : null;

        for (let item = 0; item < cssArray.length; item++)
        {
            csl.composeLinkElement({ rel: 'stylesheet', type: 'text/css', href: cssArray[item], as: 'style' });
        }

    }

    function setSlide(targetIndex)
    {
        const slides = document.querySelectorAll('div.slideview');

        csv.index = (targetIndex < 1) ? slides.length : (targetIndex > slides.length) ? 1 : csv.index;

        slides.forEach(node => { node.style.display = 'none'; } );
        slides[csv.index-1].style.display = 'block';

        if (csv.attribute.ptr) setPointerStyle();

        function setPointerStyle()
        {
            const pointers = document.querySelectorAll('span.ptr');
            const el = document.querySelector('span.active');

            if (el) el.className = 'ptr';
            pointers[csv.index-1].className += ' active';
        }

    }

    function activateSlideView()
    {
        csv.progenitor.style.display = 'none';

        getSlideView();
        setSlide();

        setTimeout(function() { setSlideViewDisplay('block'); }, csv.attribute.delay);
    }


    function setSlideViewDisplay(attribute)
    {
        const nodelist = document.querySelectorAll('img.slide, #' + csv.attribute.HTMLSlideViewElement);
        nodelist.forEach(node => { node.style.display = attribute; } );
    }

}).call(window);
