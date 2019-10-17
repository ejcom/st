import React, {
  memo,
} from 'react';

import classNames from 'css-bem-classes'

import DocList from './containers/DocList'

import './style.css'

function App() {
  const cn = classNames('app')

  return (
    <div className={cn()}>
      <DocList />
    </div>
  );
}

export default memo(App);
