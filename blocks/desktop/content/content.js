modules.define('content',
['i-bem__dom', 'BEMHTML'],
function (provide, BEMDOM, BEMHTML) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    console.log('Content inited', BEMHTML.apply({block: 'content', elem: 'test'}));
                }
            }
        }
    }));

});
