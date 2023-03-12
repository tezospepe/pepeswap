import { SpicySwapState } from 'app/pages/Swap/slice/types';
import { WalletState } from 'app/slice/wallet/types';
import { ThemeState } from 'styles/theme/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  spicySwap?: SpicySwapState;
  wallet?: WalletState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
