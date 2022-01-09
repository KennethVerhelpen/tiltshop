import { useState, useRef } from 'react';
import clsx from 'clsx';

import { EmailTwoTone, MarkunreadMailboxTwoTone } from '@material-ui/icons';

import * as S from './register-form.styles';

export const RegisterForm = () => {
	const [form, setForm] = useState(null);
	const emailInput = useRef(null);

	const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading' });

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: emailInput.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: 'error',
        message: error
      });
      return;
    }

    emailInput.current.value = '';
    setForm({
      state: 'success',
      message: `Hooray!`
    });
  };

	return (
		<form onSubmit={subscribe} className={'border border-primary-700 text-center rounded-xl layout-column layout-align-center-center bg-primary-900 width-100 flex p-32'}>
			{ form ?
				<main className={'layout-column layout-align-center-center'}>
					{ form.state === 'success' && (
						<div className={'layout-column layout-align-center-center'}>
							<MarkunreadMailboxTwoTone style={{ fontSize: 32 }} className={'mb-32 text-primary-100'}/>
							<span className={'h3 strong serif text-primary-100 mb-16'}>Hooray!</span>
							<span className={'small text-primary-100'}>You're now on the list.</span>
						</div>
					)}
					{ form.state === 'error' && (
						<div className={'layout-column layout-align-center-center'}>
							<span className={'h3 strong serif text-primary-100 mb-16'}>Oops!</span>
							<span className={'small text-primary-100 mb-32'}>{form.message}</span>
							<button className={'btn btn-md btn-raised width-100'} onClick={() => setForm(undefined)}>Go back</button>
						</div>
					)}
					{ form.state === 'loading' && (
						<div className={'layout-column layout-align-center-center'}>
							<span className={'small text-primary-100 mb-32'}>Subscribing...</span>
						</div>
					)}
				</main> : null
			}
			<main className={clsx({ 'hide' : form },'layout-column layout-align-center-center')}>
				<EmailTwoTone style={{ fontSize: 32 }} className={'mb-32 text-primary-100'}/>
				<span className={'h3 strong serif text-primary-100 mb-16'}>Stay tuned about our latest articles</span>
				<span className={'small text-primary-100 mb-16'}>Register to our free newsletter and get the latest reviews directly in your mailbox.</span>
				<S.Input
					id={'email-input'}
					name={'email'}
					ref={emailInput}
					required
					type={'email'}
					className={'text-primary-100 px-8 border-none rounded-sm width-100 mb-16'}
					placeholder={'Enter your email here...'}
				/>
				<button className={'btn btn-md btn-raised width-100'} type={'submit'}>Register now</button>
			</main>
		</form>
	);
}