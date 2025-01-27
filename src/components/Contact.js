import { useForm } from 'react-hook-form';
import classes from '../css/Contact.module.css'

export default function Contact() {
  // 既定値を準備
  const defaultValues = {
    name: '',
    email: '',
    message: ''
  };

  // フォームを初期化
  const { 
    register, // フォームの入力フィールドを登録
    handleSubmit, // フォーム送信の処理をラップ
    reset, // クリアボタンで使用する、フォームをリセット
    formState: { errors, isSubmitting } // エラーと送信状態を管理
  } = useForm({defaultValues})

  // サブミット時の処理、APIでデータを送信してアラート表示
  const onsubmit = async (data) => {
    try {
      const res = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'post',
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data) // リクエストボディに設定
      });

      if (res.ok) {
        alert('送信しました。');
        handleClear();
      } else {
        throw new Error();
      }
      
    } catch (error) {
      console.error('エラー：', error);
      alert('エラーが発生しました。');
    }
  };
  
  // クリアボタンの処理、フォームをリセット
  const handleClear = () => reset();

  return (
    <div className={classes.contactBox}>
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        {/* 検証ルールなどをフォームに紐づけ */}
        <h1>問合わせフォーム</h1>
        <div className={classes.formSection}>
          <div className={classes.formBox}>
            <label className={classes.formLabel} htmlFor='name'>お名前 </label>
            <input className={classes.formInput} id='name' type='text' disabled={isSubmitting}
              {...register('name', {
                required: '名前は必須入力です。',
                maxLength: {
                  value: 30,
                  message: '名前は３０文字以内にして下さい。'
                }
              })} />
          </div>
          <div className={classes.errorMessage}>{errors.name?.message}</div>
        </div>
        <div className={classes.formSection}>
        <div className={classes.formBox}>
          <label className={classes.formLabel} htmlFor='email'>メールアドレス </label>
          <input className={classes.formInput} id='email' type='text' disabled={isSubmitting}
            {...register('email', {
              required: 'メールアドレスは必須入力です。',
              pattern: {
                value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                message: 'メールアドレスの形式が不正です。'
              }
            })} />
        </div>
        <div className={classes.errorMessage}>{errors.email?.message}</div>
        </div>
        <div className={classes.formBox}>
          <label className={classes.formLabel} htmlFor='message'>本文 </label>
          <textarea className={classes.textArea} id='message' type='text' disabled={isSubmitting}
            {...register('message', {
              required: '本文は必須入力です。',
              maxLength: {
                value: 500,
                message: '本文は５００字以内にして下さい。'
              }
            })} />
        </div>
        <div className={classes.errorMessage}>{errors.message?.message}</div>
        <div className={classes.formButtons}>
          <button className={classes.formSubmitButton} type="submit" disabled={isSubmitting}>
            送信
          </button>
          <button className={classes.formClearButton} type="button" onClick={handleClear} disabled={isSubmitting}>
            クリア
          </button>
        </div>
      </form>
    </div>
  )
}