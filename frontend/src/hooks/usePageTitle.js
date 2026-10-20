import { useEffect } from 'react'

/** Fija el <title> del documento mientras la página está montada. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
