import { useState } from 'react'
import { MoonIconSvg } from './MoonIconSvg';
import { SunIconSvg } from './SunIconSvg';

export const Icon = () => {
  const [animationClass, setAnimationClass] = useState<string>('');

  const handleClick = () => {
    setAnimationClass('dark');
  }

  return (

    <button className={`icon ${animationClass}`} onClick={handleClick}>
      {animationClass === '' ?
        MoonIconSvg
        :
        SunIconSvg
      }
    </button >
  )
}



