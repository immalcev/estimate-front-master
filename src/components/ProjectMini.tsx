import classNames from "classnames";
import style from "../css/style.module.css";
import { NavLink } from "react-router-dom";
import { ProjectData } from "./types";

const ProjectMini = (props: ProjectData) => {
  const { id, name, description, status, start_date, scope, userCount, parent } = props;

  return (
    <>
      <NavLink to={`/ProjectPage/${id}`}>
        <div className={style.project}>
          <div className={style.project_name_block}>
            <p className={style.project_name}>{name}</p>
            id: {id}
          </div>
          {!parent && (
            <>
              <div className={style.project_info}>
                <div className={style.progress_block}>
                  <p className={style.progress_count}>{scope} ч.</p>
                </div>
                <div className={style.users_count_block}>
                  <div className={style.progress_count}>{userCount} <div className={classNames(style.options_icon, style.view_members_icon_white)}></div></div>
                </div>
              </div>
            </>)}
          {!!parent && (
            <>
              <div className={style.project_info}>
                <div className={style.progress_block}>
                  <p className={style.progress_count}>{scope} ч.</p>
                </div>
              </div>
            </>)}
        </div>
      </NavLink>
    </>
  );
};

export default ProjectMini;