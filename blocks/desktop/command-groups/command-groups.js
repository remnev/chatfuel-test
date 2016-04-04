modules.define('command-groups',
['i-bem__dom', 'BEMHTML'],
function (provide, BEMDOM, BEMHTML) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this._addGroupButton = this.findBlockOn('add-group', 'button');

                    this._addGroupButton.on('click', this._onAddGroupButtonClick, this);
                }
            }
        },

        _onAddGroupButtonClick: function () {
            var commandGroupHtml = BEMHTML.apply({
                block: 'command-group',
                title: 'New group',
                commands: []
            });
            var commandGroupDomElem = BEMDOM.append(this.elem('inner'), commandGroupHtml);
            var commandGroup = this.findBlockOn(commandGroupDomElem, 'command-group');

            commandGroup.findElem('edit').click();
        }
    }));

});
