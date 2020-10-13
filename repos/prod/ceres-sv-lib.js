export { cereslibrary }

var cereslibrary = {};
(function(cereslib)
{
    'use strict';

    cereslib.test1 = function() { test1(); };
    cereslib.test2 = function(str) { test2(str); };
    cereslib.test3 = function() { test3(); };
    cereslib.isEmpty = function(this) { this.isEmpty(); };
    cereslib.isBoolean = function() { isBoolean(); };
    cereslib.errorHandler = function() { errorHandler(); };
    cereslib.setHorizontalSwipe = function(touch, callback, args) { setHorizontalSwipe(touch, callback, args); };
    cereslib.importStylesheet = function(url) { importStylesheet(url); };
    cereslib.composeElement = function(el) { composeElement(el); };
    cereslib.composeAttribute = function(attrib) { composeAttribute(attrib); };

    function test1()
    {
        console.log('hello from cereslibrary');
    }

    function test2(str)
    {
        console.log(str);
    }

    //function isEmpty(str)
    String.prototype.isEmpty = function()
    {
        return (this.length === 0 || !this.trim());
    };

    String.prototype.isBoolean = function()
    {
        const token = this.trim().toUpperCase();

        if (!token) return false;

        const lookup = {
            'TRUE': true,
            'T':  true,
            'YES': true,
            'Y': true,
            '1': true
        };

        return lookup[token] || false;
    }

    class Component
    {
        constructor()
        {
            this.type = function() { return type; },
            this.attribute = function() { return attribute; }
        }

    }

    let resource = new Component();

    function errorHandler(str)
    {
        const err = str + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
        console.log(err);

        if (csv.attribute.trace) alert(err);

        return false;
    }


    function setHorizontalSwipe(touch, callback, args)
    {
        const el = document.querySelector(touch.el);

        if (!touch.act) touch.act = 10;

        el.addEventListener('touchstart', e => { touch.start = e.changedTouches[0].screenX; });

        el.addEventListener('touchend', e =>
        {
            touch.end = e.changedTouches[0].screenX;

            if (Math.abs(touch.start - touch.end) > touch.act)
            {
                args.action = (touch.start > touch.end) ? true : false;
                callback.call(this, args);
            }

        });

    }

    function importStylesheet(url)
    {
        if (!url) return;

        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.as = 'style';

        onloadListener();
        addEventListener();
        onReadyStateChangeListener();

        document.head.appendChild(link);

        function onloadListener()
        {
            link.onload = function () {}
        }

        function addEventListener()
        {
            if (link.addEventListener)
            {
                link.addEventListener('load', function() {}, false);
            }

        }

        function onReadyStateChangeListener()
        {
            link.onreadystatechange = function()
            {
                const state = link.readyState;

                if (state === 'loaded' || state === 'complete')
                {
                    link.onreadystatechange = null;
                }

            };

        }

    }

    function composeElement(element)
    {
        const el = document.createElement(element.el);

        el.id = element.id;
        element.parent.appendChild(el);

        if (element.classValue) composeAttribute({ id: el.id, type: 'class', value: element.classValue });
        if (element.onClickEventValue) composeAttribute({ id: el.id, type: 'onclick', value: element.onClickEventValue });
        if (element.url) composeAttribute({ id: el.id, type: 'src', value: element.url });
        if (element.accessibility) composeAttribute({ id: el.id, type: 'alt', value: element.accessibility });
        if (element.markup) document.getElementById(el.id).innerHTML = element.markup;
    }

    function composeAttribute(attribute)
    {
        const el = document.getElementById(attribute.id);

        if (el)
        {
            const attributeNode = document.createAttribute(attribute.type);
            attributeNode.value = attribute.value;

            el.setAttributeNode(attributeNode);
        }

    }


    function getBoolean(symbol)
    {
        const token = symbol.trim().toUpperCase();

        if (!token) return false;

        const lookup = {
            'TRUE': true,
            'T':  true,
            'YES': true,
            'Y': true,
            '1': true
        };

        return lookup[token] || false;
    }

})(cereslibrary);
