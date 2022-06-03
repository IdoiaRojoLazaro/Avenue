import { useState } from 'react'
import { Theme, useTheme } from '~/utils/theme-provider';
import { MoonIconSvg } from './MoonIconSvg';
import { SunIconSvg } from './SunIconSvg';

export const Icon = () => {
  const [theme, setTheme] = useTheme();
  const [animationClass, setAnimationClass] = useState<string>('');

  const handleClick = () => {
    setAnimationClass('');
    setTimeout(() => setAnimationClass('offset'), 100);

    toggleTheme();
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return (

    <button className={`icon ${animationClass}`} onClick={handleClick}>
      {theme === Theme.LIGHT ?
        MoonIconSvg
        :
        SunIconSvg
      }
    </button >
  )
}