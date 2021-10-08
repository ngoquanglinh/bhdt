import { call, put, takeLatest } from 'redux-saga/effects';
import { Actions, getListRecruitmentSuccess, getListUserRecSuccess, getListUserSuccess } from '../actions';
import UserService from '../../services/user.service';
import CandidateService from '../../services/cadidate.service'
import UpfileService from '../../services/upfile.service';
import { toastSuccess } from '../../Helper/toastHelper';



function* getListUserHandler() {

    try {
        const res = yield call(UserService.getListUser);
        yield put(getListUserSuccess(res));

    } catch (error) { }
}
function* getListUserRecHandler(action) {
    const { vip } = action.payload;
    console.log(vip, 'vip');
    try {
        const res = yield call(UserService.getListUser);
        yield put(getListUserRecSuccess({ res, vip }));

    } catch (error) { }
}
function* getListRecruitmentHandler() {

    try {
        const res = yield call(UserService.getListRecruitment);
        yield put(getListRecruitmentSuccess(res));
    } catch (error) { }
}


function* handlerVerifyCandidate(action) {

    try {
        yield call(CandidateService.verifyCandidate, action.payload);
        const res = yield call(UserService.getListUser);
        yield put(getListUserSuccess(res));
    } catch (error) { }
}
function* handlerUpdateCV(action) {
    const { cv } = action.payload;
    // const cvData = new FormData()
    // cvData.append('cv', cv);
    const avatarData = new FormData()

    try {
        // const cvUrl = yield call(UpfileService.upfile,cvData);
        const avatarUrl = yield call(UpfileService.upfile, avatarData);
        console.log(avatarUrl, 'avatarUrl');
        // yield call(UserService.editUserCV,{...action.payload,cv:cvUrl,avatar:avatarUrl});
        yield call(UserService.editUserCV, { ...action.payload, cv: avatarUrl.url });

        const res = yield call(UserService.getListUser);
        yield put(getListUserSuccess(res));
        yield toastSuccess('Cập nhật thành công!');

        // yield call(CandidateService.verifyCandidate, action.payload);
        // const res = yield call(UserService.getListUser);
        // yield put(getListUserSuccess(res));
    } catch (error) { }
}




export default function* handlerListUserSaga() {
    yield takeLatest(Actions.GET_LIST_USER, getListUserHandler);
    yield takeLatest(Actions.GET_LIST_USER_REC, getListUserRecHandler);
    yield takeLatest(Actions.VERIFY_CANDIDATE, handlerVerifyCandidate);
    yield takeLatest(Actions.EDIT_USER, handlerUpdateCV);
    yield takeLatest(Actions.GET_LIST_RECRUITMENT, getListRecruitmentHandler);

}
