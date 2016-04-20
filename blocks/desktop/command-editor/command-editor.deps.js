([
    {
        tech: 'js',
        shouldDeps: [
            {
                elem: 'inner',
                tech: 'bemhtml'
            }
        ]
    },
    {
        mustDeps: [
            {
                block: 'events',
                elem: 'channels'
            }
        ],
        shouldDeps: [
            {elem: 'inner'},
            {block: 'action-card'}
        ]
    }
]);
