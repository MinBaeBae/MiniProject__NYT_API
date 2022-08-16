import React, { memo } from 'react'

function NewsListMemo({page}) {
  return (
    <>
      {page}
    </>
  )
}
export default memo(NewsListMemo)