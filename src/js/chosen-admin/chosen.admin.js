if (typeof Fieldset !== 'undefined') {
    Fieldset.applyCollapse = Fieldset.applyCollapse.wrap(function(parent, containerId){
        parent(containerId);

        if ($(containerId).visible()) {
            $(containerId).select('select:not(name="limit")').each(function(el){
                if (!$(el.identify()+'_chosen')) {
                    new Chosen(el, {
                        disable_search_threshold: 10
                    });
                }
            });
        }
    });
}

if (typeof varienGlobalEvents !== 'undefined') {
    varienGlobalEvents.attachEventHandler('showTab', function(ev){
        var tab = ev.tab;
        var tabContentEl = $(tab.identify()+'_content');

        if (tabContentEl) {
            tabContentEl.select('select:not(name="limit")').each(function(el){
                if (!$(el.identify()+'_chosen')) {
                    var firstChild = el.firstDescendant();

                    if (firstChild.readAttribute('value') == '') {
                        el.writeAttribute('data-placeholder', firstChild.text);
                        firstChild.update(); // Clear out content of first option
                    }

                    new Chosen(el, {
                        disable_search_threshold: 10,
                        allow_single_deselect: true
                    });
                }
            });
        }
    });
}

if (typeof toggleValueElements == 'function') {
    toggleValueElements = toggleValueElements.wrap(function(parent, checkbox, container, excludedElements, checked) {
        parent(checkbox, container, excludedElements, checked);

        if ($(container).select('.chosen-container').length) {
            $(container).select('select').each(function(el){
                Event.fire(el, "chosen:updated");
            });
        }
    });
}
