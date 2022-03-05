import axios from 'axios'

import Auth from './auth.service'
import GlobalData from '../tools/GlobalData'

const BASE_API_URL = `${GlobalData.back_end_server_ip}:${GlobalData.back_end_server_port}/api/`
const PLAYLIST_API_URL = `${BASE_API_URL}`

class PlaylistService {

  addPlaylist(playlist_title, playlist_status, content_type='video') {
    const currentUser = Auth.getCurrentUser();
    return axios.post(`${PLAYLIST_API_URL}addPlaylist?user_id=${currentUser.user_id}&access_key=${currentUser.access_key}&playlist_title=${playlist_title}&playlist_status=${playlist_status}&content_type=${content_type}`);
  }

  addHistory(video_id) {
    const currentUser = Auth.getCurrentUser();
    if( currentUser ) {
      return axios.post(`${PLAYLIST_API_URL}addHistory?user_id=${currentUser.user_id}&access_key=${currentUser.access_key}&video_id=${video_id}`);
    } else {
      return axios.post(`${PLAYLIST_API_URL}addHistory?video_id=${video_id}`);
    }
  }

  removePlaylist(id) {
    const currentUser = Auth.getCurrentUser();
    return axios.post(`${PLAYLIST_API_URL}removePlaylist/${id}?user_id=${currentUser.user_id}&user_key=${currentUser.access_key}`);
  }

  changePlaylist(id, currentPlaylistTitle, currentPlaylistStatus, thumb_video, type, content_type='video') {
    const currentUser = Auth.getCurrentUser();
    return axios.post(`${PLAYLIST_API_URL}changePlaylist/${id}?user_id=${currentUser.user_id}&user_key=${currentUser.access_key}&currentPlaylistTitle=${currentPlaylistTitle}&currentPlaylistStatus=${currentPlaylistStatus}&thumb_video=${thumb_video}&type=${type}&content_type=${content_type}`);
  }

  getAllPlaylist() {
    const currentUser = Auth.getCurrentUser();
    return axios.get(`${PLAYLIST_API_URL}getAllPlaylist?user_id=${currentUser.user_id}&access_key=${currentUser.access_key}`);
  }

  getAllBlogPlaylist() {
    const currentUser = Auth.getCurrentUser();
    return axios.get(`${PLAYLIST_API_URL}getAllBlogPlaylist?user_id=${currentUser.user_id}&access_key=${currentUser.access_key}`);
  }

  getPlaylist(playlist_id) {
    const currentUser = Auth.getCurrentUser();
    return axios.get(`${PLAYLIST_API_URL}getPlaylist?user_id=${currentUser.user_id}&access_key=${currentUser.access_key}&playlist_id=${playlist_id}`);
  }

  getPublicBlogPlaylist(playlist_id, loginstatus) {
    // console.log('loginstatus 11111',  loginstatus)
    const currentUser = Auth.getCurrentUser();
    return axios.get(`${PLAYLIST_API_URL}getPublicBlogPlaylist?user_id=${currentUser && currentUser.user_id}&access_key=${currentUser && currentUser.access_key}&playlist_id=${playlist_id}&loginstatus=${loginstatus}`);
  }

  getBlogPlaylist(playlist_id) {
    const currentUser = Auth.getCurrentUser();
    return axios.get(`${PLAYLIST_API_URL}getBlogPlaylist?user_id=${currentUser.user_id}&access_key=${currentUser.access_key}&playlist_id=${playlist_id}`);
  }

  getPublicPlaylist(playlist_id) {
    const currentUser = Auth.getCurrentUser();
    return axios.get(`${PLAYLIST_API_URL}getPublicPlaylist?user_id=${currentUser && currentUser.user_id}&access_key=${currentUser && currentUser.access_key}&playlist_id=${playlist_id}`);
  }
  getPlaylistType(playlist_id) {
    const currentUser = Auth.getCurrentUser();
    return axios.get(`${PLAYLIST_API_URL}getPlaylistType?user_id=${currentUser && currentUser.user_id}&access_key=${currentUser && currentUser.access_key}&playlist_id=${playlist_id}`);
  }
}

export default new PlaylistService();