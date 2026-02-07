import { useEffect, useState } from 'react'

const EBreakpoint = {
  BASE: 0,
  LG: 1200,
  MD: 992,
  SM: 768,
  XL: 1408,
  XS: 576,
} as const

type Breakpoint = (typeof EBreakpoint)[keyof typeof EBreakpoint]

export { EBreakpoint, type Breakpoint }

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(EBreakpoint.XL)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < EBreakpoint.XS) {
        setBreakpoint(EBreakpoint.XS)
      } else if (width >= EBreakpoint.XS && width < EBreakpoint.SM) {
        setBreakpoint(EBreakpoint.SM)
      } else if (width >= EBreakpoint.SM && width < EBreakpoint.MD) {
        setBreakpoint(EBreakpoint.MD)
      } else if (width >= EBreakpoint.MD && width < EBreakpoint.LG) {
        setBreakpoint(EBreakpoint.LG)
      } else {
        setBreakpoint(EBreakpoint.XL)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Set initial breakpoint

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { breakpoint, isMobile: breakpoint < EBreakpoint.MD }
}

export default useBreakpoint
