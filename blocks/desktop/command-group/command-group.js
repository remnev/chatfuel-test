modules.define('command-group',
['i-bem__dom', 'BEMHTML'],
function (provide, BEMDOM, BEMHTML) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this._inputBlock = this.findBlockOn('input', 'input');

                    this.bindTo('edit', 'click', this._onEditClick);
                    this.bindTo('input', 'keyup', this._onInputKeyup);
                    this.bindTo(this.elem('command', 'add-command'), 'click', this._onAddCommandClick);
                }
            }
        },

        _onAddCommandClick: function (e) {
            var commandHtml = BEMHTML.apply({
                block: 'command-group',
                elem: 'command',
                content: 'New command'
            });

            BEMDOM.before(e.currentTarget, commandHtml);
        },

        _onEditClick: function () {
            this.setMod(this.elem('input'), 'visible');

            this._inputBlock
                .setMod('focused')
                .setVal(this.elem('title').text());
        },

        _onInputKeyup: function (e) {
            if (e.keyCode == 27) {
                this.delMod(this.elem('input'), 'visible');

                return;
            }

            if (e.keyCode != 13) {
                return;
            }

            this.delMod(this.elem('input'), 'visible');
            BEMDOM.update(this.elem('title'), this._inputBlock.getVal());
        }
    }));

});
