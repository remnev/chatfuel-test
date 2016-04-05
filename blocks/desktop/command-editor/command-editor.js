modules.define('command-editor',
['i-bem__dom', 'BEMHTML', 'events__channels'],
function (provide, BEMDOM, BEMHTML, channels) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    channels('command').on('select', this._onCommandSelect, this);
                }
            },

            visible: {
                '': function () {
                    channels('command-editor').emit('hide');
                }
            }
        },

        _onClose: function () {
            this.delMod('visible');
        },

        _onCommandSelect: function (e, data) {
            var innerHtml = BEMHTML.apply({
                block: 'command-editor',
                elem: 'inner',
                title: data.title
            });

            BEMDOM.replace(this.findElem('inner'), innerHtml);

            this.setMod('visible');
        }
    }, {
        live: function () {
            this.liveBindTo('close', 'click', function () {
                this._onClose();
            });

            return false;
        }
    }));

});
