import React, {FC} from 'react';

const SignInLayout: FC = ({children}) => {
    return (
        <div className={'sign-in-layout'}>
            {children}
        </div>
    )
};
export default SignInLayout;
