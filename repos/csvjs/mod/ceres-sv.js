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

    let resource = new Component();

    class Slideviewer
    {
        constructor()
        {
            this.progenitor = null;
            this.imageArray = null,
            this.listElement = null,
            this.attribute = function() { return attribute; },
            this.callback = false,
            this.index = 1
        }

    }

    let csv = new Slideviewer();

    csv.attribute.HTMLSlideViewElement = 'ceres-sv'; // required element name
    csv.attribute.HTMLImageListElement = 'ceres-csv'; // optional markup noscript tag id when using embedded image lists
    csv.attribute.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/repos/stylesheets/ceres-sv.css'; // the default slideview stylesheet

    window.customElements.get(csv.attribute.HTMLSlideViewElement) || window.customElements.define(csv.attribute.HTMLSlideViewElement, class extends HTMLElement
    {
        async connectedCallback()
        {
            const css = this.getAttribute('css') ? this.getAttribute('css') : csv.attribute.defaultCSS;
            if (!csl.isEmptyOrNull(css)) await ( await importSlideViewStylesheets(css) );

            const src = this.getAttribute('src') ? this.getAttribute('src') : null;
            if (!csl.isEmptyOrNull(src) && csl.urlExists(src)) this.innerHTML =  await ( await fetch(src)).text();

            if (getSlideviewAttributes()) activateSlideView();
        }

    });

    function getSlideviewAttributes()
    {
        if (!getProgenitor()) return csl.inspect({ type: csl.error, notification: resource.attribute.ProgenitorNotFound, logtrace: csv.attribute.trace });
        if (!getAttributePrecursors()) return csl.inspect({ type: csl.error, notification: resource.attribute.ListContainerNotFound, logtrace: csv.attribute.trace });

        return getImageArray();

        function getProgenitor()
        {
            resource.attribute.ProgenitorNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' document element';

            csv.progenitor = (document.getElementById(csv.attribute.HTMLSlideViewElement)) ? document.getElementById(csv.attribute.HTMLSlideViewElement) : document.getElementsByTagName(csv.attribute.HTMLSlideViewElement)[0];

            return !csl.isEmptyOrNull(csv.progenitor);
        }

        function getAttributePrecursors()
        {
            csv.progenitor.id = csv.attribute.HTMLSlideViewElement;

            csv.listElement = document.getElementById(csv.attribute.HTMLImageListElement) ? document.getElementById(csv.attribute.HTMLImageListElement) : document.getElementsByTagName('noscript')[0];
            csv.callback = !csl.isEmptyOrNull(csv.progenitor.getAttribute('src'));

            csv.attribute.ptr = !csl.getBooleanAttribute(csv.progenitor.getAttribute('ptr'));
            csv.attribute.sur = !csl.getBooleanAttribute(csv.progenitor.getAttribute('sur'));
            csv.attribute.sub = !csl.getBooleanAttribute(csv.progenitor.getAttribute('sub'));
            csv.attribute.trace = csl.getBooleanAttribute(csv.progenitor.getAttribute('trace'));
            csv.attribute.delay = Number.isInteger(parseInt(csv.progenitor.getAttribute('delay'))) ? parseInt(csv.progenitor.getAttribute('delay')) : 500;

            Object.freeze(csv.attribute);

            resource.attribute.ProgenitorInnerHTML = 'Progenitor innerHTML [' + csv.attribute.HTMLSlideViewElement + ']: ' + csl.newline + csl.newline;
            resource.attribute.ListContainerMarkup = 'Image list markup ' + ((csv.callback) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv.attribute.HTMLSlideViewElement + ']:' + csl.newline;
            resource.attribute.BodyContentList = 'The ' + csv.attribute.HTMLSlideViewElement + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
            resource.attribute.BodyContentListNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' fallback noscript image list when searching the document body';
            resource.attribute.CSVObjectAttributes = 'The csv object attribute properties after initialisation [' + csv.attribute.HTMLSlideViewElement + ']: ';
            resource.attribute.ListContainerNotFound = 'Error: Unable to find either the connectedCallback ' + csv.attribute.HTMLSlideViewElement + ' attribute source nor the fallback noscript image list container';

            Object.freeze(resource.attribute);

            return (csv.callback || csv.listElement) ? true : false;
        }

        function getImageArray()
        {
            csl.inspect({ type: csl.notify, notification: resource.attribute.CSVObjectAttributes + getAttributeProperties(), logtrace: csv.attribute.trace });

            let imageList = getImageList();
            if (imageList) csl.inspect({ type: csl.notify, notification: resource.attribute.ListContainerMarkup + imageList, logtrace: csv.attribute.trace });

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
                    csl.inspect({ type: csl.notify, notification: resource.attribute.BodyContentList, logtrace: csv.attribute.trace });

                    const list = !csl.isEmptyOrNull(csv.listElement) ? csv.listElement.textContent : null;
                    return !csl.isEmptyOrNull(list) ? list : csl.inspect({ type: csl.error, notification: resource.attribute.BodyContentListNotFound, logtrace: csv.attribute.trace });
                }

            }

            function getAttributeProperties()
            {
                let str = '';
                for (let property in csv.attribute) str += property + ': ' + csv.attribute[property] + ', ';

                return str.replace(/, +$/g,'');
            }

        }

    }

    function getSlideView()
    {
        csv.progenitor.innerHTML = null;

        const imageContainer = document.createElement('div');
        imageContainer.id = csv.attribute.HTMLSlideViewElement + '-image-container';
        csv.progenitor.appendChild(imageContainer);

        csl.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

        for (let item = 0; item < csv.imageArray.length; item++)
        {
            var arrayItem = csv.imageArray[item].split(',');

            let qualifier = item + 1;
            let id = 'slideview' + qualifier;

            let elements = {
                'surName': 'slideview-sur' + qualifier,
                'imgName': 'slideview-img' + qualifier,
                'subName': 'slideview-sub' + qualifier
            };

            csl.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

            let slideContainer = document.getElementById(id);

            if (csv.attribute.sur) csl.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle(qualifier) });
            csl.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEventValue: 'window.getImage(this);', url: getURL(), accessibility: getAccessibilityText() });
            if (csv.attribute.sub) csl.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
        }

        csl.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEventValue: 'window.getSlide(-1, true)', url: getURL() });
        csl.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEventValue: 'window.getSlide(1, true)', url: getURL() });

        if (csv.attribute.ptr) getSlideViewPointerContainer();

        setSlideViewDisplay('none');

        csl.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

        function getHorizontalSwipe(swipe)
        {
            const offset = (swipe.action) ? swipe.right : swipe.left;
            setSlide(csv.index = csv.index += offset);
        }

        csl.inspect({ type: csl.notify, notification: resource.attribute.ProgenitorInnerHTML + csv.progenitor.innerHTML, logtrace: csv.attribute.trace });

        function getSlideViewPointerContainer()
        {
            csv.progenitor.appendChild(document.createElement('br'));

            const pointerElement = document.createElement('div');

            pointerElement.id = csv.attribute.HTMLSlideViewElement + '-pointer-container';
            csv.progenitor.appendChild(pointerElement);

            csl.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

            for (let item = 0; item < csv.imageArray.length; item++)
            {
                let qualifier = item + 1;
                let svpname = 'slideview-ptr' + qualifier;

                csl.composeElement({ el: 'span', id: svpname, classValue: 'ptr', parent: pointerElement, onClickEventValue: getClickEventValue(qualifier) });
            }

            csv.progenitor.appendChild(document.createElement('br'));

            function getClickEventValue(indexItem)
            {
                return 'window.getSlide(' + indexItem + ')';
            }

        }

        function getURL()
        {
            return (!csl.isEmptyOrNull(arrayItem[0])) ? arrayItem[0].trim() : null;
        }

        function getSurtitle(indexItem)
        {
            return (csv.attribute.sur) ? indexItem + ' / ' + csv.imageArray.length : null;
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

    function importSlideViewStylesheets(str)
    {
        const cssArray = !csl.isEmptyOrNull(str) ? str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';') : null;

        for (let item = 0; item < cssArray.length; item++)
        {
            csl.importLinkElement({ rel: 'stylesheet', type: 'text/css', href: cssArray[item], as: 'style' });
        }

    }

    function setSlide(targetIndex)
    {
        const slides = document.querySelectorAll('div.slideview');

        csv.index = (targetIndex < 1) ? slides.length : (targetIndex > slides.length) ? 1 : csv.index;

        slides.forEach(node => { node.style.display = 'none'; } );
        slides[csv.index-1].style.display = 'block';

        if (csv.attribute.ptr) setPointer();

        function setPointer()
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
        const nodelist = document.querySelectorAll('a.prev, a.next, div.subtitle, div.surtitle, img.slide, #' + csv.attribute.HTMLSlideViewElement);
        nodelist.forEach(node => { node.style.display = attribute; } );
    }

}).call(window);
