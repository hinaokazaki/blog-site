import React from 'react';

export default function Text({content}) {
	return <div dangerouslySetInnerHTML={{ __html: content}} />
};