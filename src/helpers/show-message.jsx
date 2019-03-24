import React from 'react';
import * as TVDML from 'tvdml';

export function showMessagePipeline(message) {
  return TVDML.renderModal(() => (
    <document>
      <alertTemplate>
        <title>{message}</title>
        <button onSelect={TVDML.removeModal}>
          <text>Close</text>
        </button>
      </alertTemplate>
    </document>
  ));
}

export function showMessageFactory(message) {
  return () => showMessagePipeline(message).sink();
}
