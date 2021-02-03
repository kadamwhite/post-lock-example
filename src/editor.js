import React, { useEffect, useState } from 'react';
import { useDispatch, useSelect } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';

const LockPostIfNoTagsPlugin = () => {
    const [ isLocked, setLock ] = useState( false );
    const { tags } = useSelect( ( select ) => ( {
        tags: select( 'core/editor' ).getEditedPostAttribute( 'tags' ),
    } ) );
    const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );

    useEffect( () => {
        console.log( 'Checking: ' + tags.length + '; ' + ( isLocked ? 'true' : 'false' ) );
        if ( ! isLocked && tags.length === 0 ) {
            lockPostSaving( 'no-tags' );
            setLock( true );
        } else if ( isLocked && tags.length > 0 ) {
            unlockPostSaving( 'no-tags' );
            setLock( false );
        }
    }, [ isLocked, tags.length, lockPostSaving, unlockPostSaving ] );

    // We're using this component only to plug into the React digest cycle, no rendering is needed.
    return null;
};

registerPlugin( 'test-plugin', {
    render: LockPostIfNoTagsPlugin,
} );
