import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import moment from 'moment';

import { AppDispatch, RootState } from '../../redux/configStore';
import { BookRoom, getDatphongApi } from '../../redux/reducers/roomDetailReducer';
import { getUserAPi, setUserUpdata } from '../../redux/reducers/userReducer';
import { getStoreJSON, USER_LOGIN } from '../../util/setting';

type Props = {};

export default function Profile({}: Props) {
  let userLogin = useSelector((state: RootState) => state.userReducer.userLogin);
  // lấy mảng phòng đã đặt từ redux
  const bookRoom = useSelector((state: RootState) => state.roomDetailReducer.bookRoom);

  let userStore = getStoreJSON(USER_LOGIN);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    let action = getUserAPi(userStore?.user?.id);
    dispatch(action);
    let action2 = getDatphongApi();
    dispatch(action2);
  }, []);

  const renderBookRoom = () => {
    return bookRoom.map((item: BookRoom, index: number) => {
      return (
        <tr key={index}>
          <td>{item.maPhong}</td>
          <td>{moment(item.ngayDen).format('DD MM YYYY')}</td>
          <td>{moment(item.ngayDi).format('DD MM YYYY')}</td>
          <td>{item.soLuongKhach}</td>
        </tr>
      );
    });
  };
  return (
    <div className="profile">
      <UpdateProfile />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card_img">
                <img
                  src={
                    userLogin?.avatar
                      ? userLogin?.avatar
                      : // : 'https://www.tutorsvalley.com/public/storage/uploads/tutor/1574383712-1AB5217C-5A13-4888-A5A1-BE0BCADBC655.png'
                        `https://i.pravatar.cc`
                  }
                  alt=""
                />
                <a href="#">Cập nhập ảnh</a>
              </div>
              <div>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm0 2.394l-.337.213C12.245 5.52 8.805 6.706 5.352 6.952L5 6.972V17.5c0 6.831 4.716 11.357 10.713 11.497L16 29c6.133 0 11-4.56 11-11.5V6.972l-.352-.02c-3.453-.246-6.893-1.432-10.311-3.547L16 3.192zm7 7.394L24.414 12 13.5 22.914 7.586 17 9 15.586l4.5 4.499 9.5-9.5z"></path>
                </svg>
                <h4>Xác minh danh tính</h4>
                <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
                <button>Nhận huy hiệu</button>
              </div>
              <div>
                <hr />
              </div>
              <h3>{userLogin?.name} đã xác nhận </h3>
              <div className="card-bt">
                <i className="fa fa-check"></i>
                <span>Địa chỉ email</span>
              </div>
            </div>
          </div>
          <div className="col-8">
            <h1>Xin Chào, tôi là {userLogin?.name}</h1>
            <p>Bắt đầu tham gia vào 2022</p>
            <a
              href=""
              data-bs-toggle="modal"
              data-bs-target="#modalIdProfile"
              onClick={() => {
                const action = setUserUpdata(userLogin);
                dispatch(action);
              }}
            >
              Chỉnh sửa hồ sơ
            </a>
            <div className="my-2">
              <p>Phòng đã thuê</p>
            </div>
            <hr />
            <table className="table text-center">
              <thead className="table-dark">
                <tr>
                  <th>Mã phòng</th>
                  <th>Ngày nhận phòng</th>
                  <th>Ngày trả phòng</th>
                  <th>Số khách</th>
                </tr>
              </thead>
              <tbody>{renderBookRoom()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
