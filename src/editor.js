import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelect } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';

const LockPostIfNoTagsPlugin = () => {
    const [ isLocked, setLock ] = useState( false );
    const { tags } = useSelect( ( select ) => ( {
        tags: select( 'core/editor' ).getEditedPostAttribute( 'tags' ),
    } ) );
    const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );

    useEffect( () => {
        console.log( 'Checking Tags: ' + tags.length + '; ' + ( isLocked ? 'true' : 'false' ) );
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


const LockPostIfNoCatsPlugin = () => {
    const [ isLocked, setLock ] = useState( false );
    const {
        categories,
        lock,
    } = useSelect( ( select ) => ( {
        categories: select( 'core/editor' ).getEditedPostAttribute( 'categories' ),
        lock: select( 'core/editor' ).getActivePostLock(),
    } ) );
    const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );

    useEffect( () => {
        console.log( 'Active Lock: ', lock );
        console.log( 'Checking Cats: ' + categories.length + '; ' + ( isLocked ? 'true' : 'false' ) );
        if ( ! isLocked && categories.length === 0 ) {
            lockPostSaving( 'no-categories' );
            setLock( true );
        } else if ( isLocked && categories.length > 0 ) {
            unlockPostSaving( 'no-categories' );
            setLock( false );
        }
    }, [ isLocked, categories.length, lockPostSaving, unlockPostSaving ] );

    // We're using this component only to plug into the React digest cycle, no rendering is needed.
    return null;
};

registerPlugin( 'test-plugin', {
    render: () => (
        <Fragment>
            <LockPostIfNoTagsPlugin />
            <LockPostIfNoCatsPlugin />
        </Fragment>
    ),
} );
