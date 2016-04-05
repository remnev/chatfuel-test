modules.define('command-group',
['i-bem__dom', 'BEMHTML', 'events__channels', 'jquery'],
function (provide, BEMDOM, BEMHTML, channels, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this._inputBlock = this.findBlockOn('input', 'input');

                    this.bindTo('edit', 'click', this._onEditClick);
                    this.bindTo('input', 'keyup', this._onInputKeyup);
                    this.bindTo(this.elem('command', 'add-command'), 'click', this._onAddCommandClick);
                    channels('command').on('select', this._onCommandSelect, this);
                    channels('command-editor').on('hide', this._onCommandEditorHide, this);
                }
            }
        },

        onElemSetMod: {
            command: {
                selected: {
                    true: function (elem) {
                        channels('command').emit('select', {
                            title: elem.text()
                        });
                    }
                }
            }
        },

        _onCommandSelect: function () {
            this._unselectCommands();
        },

        _onCommandEditorHide: function () {
            this._unselectCommands();
        },

        _onCommandClick: function (e) {
            var $command = $(e.currentTarget);

            if (this.hasMod($command, 'add-command')) {
                return;
            }

            this.setMod($command, 'selected');
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
        },

        _unselectCommands: function () {
            var $commands = this.findElem('command');

            this.delMod($commands, 'selected');
        }
    }, {
        live: function () {
            this.liveBindTo('command', 'click', function () {
                this._onCommandClick.apply(this, arguments);
            });

            return false;
        }
    }));

});
