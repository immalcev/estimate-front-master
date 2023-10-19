import style from '../css/style.module.css';

const MemberAccount = () => {
  return (
    <div className={style.member_account_block}>
      <div className={style.member_account_photo}></div>
      <div className={style.member_account_info}>
        <div className={style.member_account_name}>Иван Иванович И.</div>
        <div className={style.member_account_activity}>Frontend</div>
      </div>
    </div>
  )
}

export default MemberAccount