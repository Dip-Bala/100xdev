import {atom, selector} from 'recoil'

export const counterAtom = atom({
    default: 0,
    key : "count"
})

export const even = selector({
    key: 'isEven',
    get: ({ get }) => {
      const count = get(counterAtom);
      return count % 2 == 0;
    },
  })