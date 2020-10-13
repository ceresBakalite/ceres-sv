export { cereslibrary }

var cereslibrary = {};
(function()
{
    'use strict';

    this.reference = 1;
    this.notify = 2;
    this.error = 99;

    this.setHorizontalSwipe = function(touch, callback, args)
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

    this.importStylesheet = function(url)
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

    this.composeElement = function(element)
    {
        const el = document.createElement(element.el);

        el.id = element.id;
        element.parent.appendChild(el);

        if (element.classValue) this.composeAttribute({ id: el.id, type: 'class', value: element.classValue });
        if (element.onClickEventValue) this.composeAttribute({ id: el.id, type: 'onclick', value: element.onClickEventValue });
        if (element.url) this.composeAttribute({ id: el.id, type: 'src', value: element.url });
        if (element.accessibility) this.composeAttribute({ id: el.id, type: 'alt', value: element.accessibility });
        if (element.markup) document.getElementById(el.id).innerHTML = element.markup;
    }

    this.composeAttribute = function(attribute)
    {
        const el = document.getElementById(attribute.id);

        if (el)
        {
            const attributeNode = document.createAttribute(attribute.type);
            attributeNode.value = attribute.value;

            el.setAttributeNode(attributeNode);
        }

    }

    this.windowOpen = function(property)
    {
        window.open(property.element.getAttribute('src'), property.type);
    }

    this.isEmpty = function(str)
    {
        return str.isEmptyOrNull();
    };

    String.prototype.isEmptyOrNull = function()
    {
        return (this === null || this.length === 0 || !this.trim());
    };

    this.isBoolean = function(symbol)
    {
        if (this.isEmpty(symbol)) return false;

        const token = symbol.trim().toUpperCase();

        const lookup = {
            'TRUE': true,
            'T':  true,
            'YES': true,
            'Y': true,
            '1': true
        };

        return lookup[token] || false;
    }

    this.inspect = function(inspect)
    {
        const newline = '\n';

        const lookup = {
            [this.reference]: function() { if (inspect.logtrace) console.log('Reference: ' + newline + newline + inspect.reference); },
            [this.notify]: function() { if (inspect.logtrace) console.log(inspect.notification); },
            [this.error]: function() { this.errorHandler({ notification: inspect.notification, alert: inspect.logtrace } ); },
            'default': 'An unexpected error has occurred...'
        };

        return lookup[inspect.type]() || lookup['default'];
    }

    this.errorHandler = function(error)
    {
        const err = error.notification + ' [ DateTime: ' + new Date().toLocaleString() + ' ]';
        console.log(err);

        if (error.alert) alert(err);

        return false;
    }

}).call(cereslibrary);
