export { ceres }

import { cereslibrary as csvlib } from 'https://ceresbakalite.github.io/ceres-sv/repos/prod/ceres-sv-lib.js';
import 'https://ceresbakalite.github.io/ceres-sv/repos/prod/ceres-sv-lib.js';

var ceres = {};
(function(slideview)
{
    'use strict';

    slideview.tabImage = function(el) { tabImage(el); }; // global scope method reference
    slideview.getSlide = function(target, calc) { getSlide(csv.index = (calc) ? csv.index += target : target); };  // global scope method reference

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
    csv.attribute.defaultCSS = 'https://ceresbakalite.github.io/ceres-sv/repos/prod/ceres-sv.css'; // the default slideview stylesheet

    'hello from ceres'.csvlib.test();

    window.customElements.get(csv.attribute.HTMLSlideViewElement) || window.customElements.define(csv.attribute.HTMLSlideViewElement, class extends HTMLElement
    {
        async connectedCallback()
        {
            const css = this.getAttribute('css') ? this.getAttribute('css') : csv.attribute.defaultCSS;
            if (!csvlib.isEmpty(css)) await ( await importSlideViewStylesheets(css) );

            const src = this.getAttribute('src') ? this.getAttribute('src') : null;
            if (!csvlib.isEmpty(src)) this.innerHTML =  await ( await fetch(src)).text();

            if (getSlideviewAttributes()) activateSlideView();
        }

    });

    function getSlideviewAttributes()
    {
        if (!getProgenitor()) return inspect(resource.type.error, resource.attribute.ProgenitorNotFound);
        if (!getAttributePrecursors()) return inspect(resource.type.error, resource.attribute.ListContainerNotFound);

        return getImageArray();

        function getProgenitor()
        {
            resource.type.reference = 1;
            resource.type.notify = 2;
            resource.type.error = 99;

            resource.attribute.ProgenitorNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' document element';

            csv.progenitor = (document.getElementById(csv.attribute.HTMLSlideViewElement)) ? document.getElementById(csv.attribute.HTMLSlideViewElement) : document.getElementsByTagName(csv.attribute.HTMLSlideViewElement)[0];

            return (csv.progenitor) ? true : false;
        }

        function getAttributePrecursors()
        {
            const newline = '\n';

            csv.progenitor.id = csv.attribute.HTMLSlideViewElement;

            csv.listElement = document.getElementById(csv.attribute.HTMLImageListElement) ? document.getElementById(csv.attribute.HTMLImageListElement) : document.getElementsByTagName('noscript')[0];
            csv.callback = csv.progenitor.getAttribute('src') ? true : false;

            csv.attribute.ptr = !csvlib.isBoolean(csv.progenitor.getAttribute('ptr'));
            csv.attribute.sur = !csvlib.isBoolean(csv.progenitor.getAttribute('sur'));
            csv.attribute.sub = !csvlib.isBoolean(csv.progenitor.getAttribute('sub'));
            csv.attribute.trace = csvlib.isBoolean(csv.progenitor.getAttribute('trace'));
            csv.attribute.delay = Number.isInteger(parseInt(csv.progenitor.getAttribute('delay'))) ? parseInt(csv.progenitor.getAttribute('delay')) : 500;

            Object.freeze(csv.attribute);

            resource.attribute.ProgenitorInnerHTML = 'Progenitor innerHTML [' + csv.attribute.HTMLSlideViewElement + ']: ' + newline + newline;
            resource.attribute.ListContainerMarkup = 'Image list markup ' + ((csv.callback) ? 'delivered as promised by connectedCallback' : 'sourced from the document body') + ' [' + csv.attribute.HTMLSlideViewElement + ']:' + newline;
            resource.attribute.BodyContentList = 'The ' + csv.attribute.HTMLSlideViewElement + ' src attribute url is unavailable. Searching for the fallback noscript image list content in the document body';
            resource.attribute.BodyContentListNotFound = 'Error: Unable to find the ' + csv.attribute.HTMLSlideViewElement + ' fallback noscript image list when searching the document body';
            resource.attribute.CSVObjectAttributes = 'The csv object attribute properties after initialisation [' + csv.attribute.HTMLSlideViewElement + ']: ';
            resource.attribute.ListContainerNotFound = 'Error: Unable to find either the connectedCallback ' + csv.attribute.HTMLSlideViewElement + ' attribute source nor the fallback noscript image list container';

            Object.freeze(resource.attribute);

            return (csv.callback || csv.listElement) ? true : false;
        }

        function getImageArray()
        {
            inspect(resource.type.notify, resource.attribute.CSVObjectAttributes + getAttributeProperties());

            let imageList = getImageList();
            if (imageList) inspect(resource.type.notify, resource.attribute.ListContainerMarkup + imageList);

            csv.imageArray = (imageList) ? imageList.trim().replace(/\r\n|\r|\n/gi, ';').split(';') : null;

            return (csv.imageArray) ? true : false;

            function getImageList()
            {
                return (csv.callback) ? getConnectedCallbackList() : getBodyContentList();

                function getConnectedCallbackList()
                {
                    return (csv.progenitor.textContent) ? csv.progenitor.textContent : null;
                }

                function getBodyContentList()
                {
                    inspect(resource.type.notify, resource.attribute.BodyContentList);

                    const list = (csv.listElement) ? csv.listElement.textContent : null;
                    return (list) ? list : inspect(resource.type.error, resource.attribute.BodyContentListNotFound);
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

    function inspect(type, response)
    {
        const lookup = {
            [resource.type.notify]: function() { if (csv.attribute.trace) console.log(response); },
            [resource.type.error]: function() { csvlib.errorHandler({ notification: response, alert: csv.attribute.trace } ); },
            'default': 'An unexpected error has occurred - ' + csv.attribute.HTMLSlideViewElement + ' is unresponsive'
        };

        return lookup[type]() || lookup['default'];
    }

    function getSlideView()
    {
        csv.progenitor.innerHTML = null;

        const imageContainer = document.createElement('div');
        imageContainer.id = csv.attribute.HTMLSlideViewElement + '-image-container';
        csv.progenitor.appendChild(imageContainer);

        csvlib.composeAttribute({ id: imageContainer.id, type: 'class', value: 'slideview-image-container' });

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

            csvlib.composeElement({ el: 'div', id: id, classValue: 'slideview fade', parent: imageContainer });

            let slideContainer = document.getElementById(id);

            if (csv.attribute.sur) csvlib.composeElement({ el: 'div', id: elements.surName, classValue: 'surtitle', parent: slideContainer, markup: getSurtitle(qualifier) });
            csvlib.composeElement({ el: 'img', id: elements.imgName, classValue: 'slide', parent: slideContainer, onClickEventValue: 'window.tabImage(this);', url: getURL(), accessibility: getAccessibilityText() });
            if (csv.attribute.sub) csvlib.composeElement({ el: 'div', id: elements.subName, classValue: 'subtitle', parent: slideContainer, markup: getSubtitle() });
        }

        csvlib.composeElement({ el: 'a', id: 'slideview-prev', classValue: 'prev', parent: imageContainer, markup: '&#10094;', onClickEventValue: 'window.getSlide(-1, true)', url: getURL() });
        csvlib.composeElement({ el: 'a', id: 'slideview-next', classValue: 'next', parent: imageContainer, markup: '&#10095;', onClickEventValue: 'window.getSlide(1, true)', url: getURL() });

        if (csv.attribute.ptr) getSlideViewPointerContainer();

        setSlideViewDisplay('none');

        csvlib.setHorizontalSwipe( { act: 80, el: 'div.slideview-image-container' }, getHorizontalSwipe, { left: -1, right: 1 } );

        function getHorizontalSwipe(swipe)
        {
            const offset = (swipe.action) ? swipe.right : swipe.left;
            getSlide(csv.index = csv.index += offset);
        }

        inspect(resource.type.notify, resource.attribute.ProgenitorInnerHTML + csv.progenitor.innerHTML);

        function getSlideViewPointerContainer()
        {
            csv.progenitor.appendChild(document.createElement('br'));

            const pointerElement = document.createElement('div');

            pointerElement.id = csv.attribute.HTMLSlideViewElement + '-pointer-container';
            csv.progenitor.appendChild(pointerElement);

            csvlib.composeAttribute({ id: pointerElement.id, type: 'class', value: 'slideview-pointer-container' });

            for (let item = 0; item < csv.imageArray.length; item++)
            {
                let qualifier = item + 1;
                let svpname = 'slideview-ptr' + qualifier;

                csvlib.composeElement({ el: 'span', id: svpname, classValue: 'ptr', parent: pointerElement, onClickEventValue: getClickEventValue(qualifier) });
            }

            csv.progenitor.appendChild(document.createElement('br'));

            function getClickEventValue(indexItem)
            {
                return 'window.getSlide(' + indexItem + ')';
            }

        }

        function getURL()
        {
            return (!csvlib.isEmpty(arrayItem[0])) ? arrayItem[0].trim() : null;
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
            return (!csvlib.isEmpty(arrayItem[1])) ? arrayItem[1].trim() : null;
        }

    }

    function importSlideViewStylesheets(str)
    {
        const cssArray = (str) ? str.trim().replace(/,/gi, ';').replace(/;+$/g, '').replace(/[^\x00-\xFF]| /g, '').split(';') : null;

        for (let item = 0; item < cssArray.length; item++)
        {
            csvlib.importStylesheet(cssArray[item]);
        }

    }

    function tabImage(el)
    {
        window.open(el.getAttribute('src'), 'image');
    }

    function getSlide(targetIndex)
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
        getSlide();

        setTimeout(function() { setSlideViewDisplay('block'); }, csv.attribute.delay);
    }


    function setSlideViewDisplay(attribute)
    {
        const nodelist = document.querySelectorAll('a.prev, a.next, div.subtitle, div.surtitle, img.slide, #' + csv.attribute.HTMLSlideViewElement);
        nodelist.forEach(node => { node.style.display = attribute; } );
    }

})(window);
