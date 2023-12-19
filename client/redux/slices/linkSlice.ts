import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {axiosPrivate} from '../../axiosConfig';
import {Link} from '../../types/link';
import {User} from '../../types/user';
interface LinkState {
  links: Link[];
  // profileLinks: []; // Change 'any' to the actual type of your links
  loading: boolean;
  error: string;
}
const initialState: LinkState = {
  links: [],
  // profileLinks: [],
  loading: false,
  error: '',
};
export const fetchLinks = createAsyncThunk(
  'link/fetchLinks',
  async ({page}: {page: number}) => {
    const response = await axiosPrivate.get(`/links?page=${page}`);
    console.log(response.data.length, 'response');
    return response?.data;
  },
);
export const addLink = createAsyncThunk(
  'link/addLink',
  async (formData: any, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.post('/post-link', formData);

      return response.data;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue('Failed to add the product');
    }
  },
);
export const likeLink = createAsyncThunk(
  'link/likeLink',
  async ({link, user}: {link: Link; user: User}, {rejectWithValue}) => {
    try {
      // console.log('link clicked', link, user);
      const response = await axiosPrivate.put('/like', {linkId: link._id});
      return {updatedLink: response?.data, user};
    } catch (error) {
      console.log('error', error);
      return rejectWithValue('Failed to like');
    }
  },
);
export const unlikeLink = createAsyncThunk(
  'link/unlikeLink',
  async ({link, user}: {link: Link; user: User}, {rejectWithValue}) => {
    try {
      //  console.log('link clicked', link, user);
      const response = await axiosPrivate.put('/unlike', {linkId: link._id});
      return {updatedLink: response?.data, user};
    } catch (error) {
      console.log('error', error);
      return rejectWithValue('Failed to remove like');
    }
  },
);
export const updateViewCount = createAsyncThunk(
  'link/updateViewCount',
  async (link: Link) => {
    await axiosPrivate.put(`/view-count/${link._id}`);
    return {link};
  },
);
export const deleteLink = createAsyncThunk(
  'link/deleteLink',
  async (link: Link, {rejectWithValue}) => {
    try {
      //  console.log('link clicked', link, user);
      const response = await axiosPrivate.delete(`/link-delete/${link._id}`);
      return response.data;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue('Failed to remove like');
    }
  },
);
export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    resetError: state => {
      state.error = '';
    },
    setLinksForUserProfile: (state, action) => {
      state.links = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchLinks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchLinks.fulfilled, (state, action) => {
      state.loading = false;

      // Extract new links from the action payload
      const newLinks = action.payload;

      if (newLinks.length === 0) {
        state.error = 'No more pages to load';
      } else {
        // Check for duplicates and add only unique links
        const uniqueLinks = newLinks.filter((newLink: any) => {
          return !state.links.some(
            existingLink => existingLink._id === newLink._id,
          );
        });
        console.log('new Links', newLinks);
        console.log('unique Links', uniqueLinks);

        state.links = [...state.links, ...uniqueLinks];
      }
    });
    builder.addCase(fetchLinks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong!';
    });
    builder.addCase(addLink.pending, state => {
      state.loading = true;
    });
    builder.addCase(addLink.fulfilled, (state, action) => {
      state.loading = false;
      state.links.push(action.payload);
    });
    builder.addCase(addLink.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(likeLink.fulfilled, (state, action) => {
      const {updatedLink, user: userToLike} = action.payload;

      // Find the index of the link in the state
      const index = state.links.findIndex(link => link._id === updatedLink._id);

      if (index !== -1) {
        // Check if the user is not already in the likes array before adding
        const user = userToLike; // Assuming auth.user is the user who liked the link

        if (!state.links[index].likes.includes(user)) {
          // If the user is not in the likes array, add them
          state.links[index].likes = [...state.links[index].likes, user];
        }
        updatedLink.postedBy = userToLike;
        // Update the entire link object in the state
        state.links[index] = updatedLink;
      }
    });
    builder.addCase(unlikeLink.fulfilled, (state, action) => {
      const {updatedLink, user: usertoUnlike} = action.payload;
      const index = state.links.findIndex(link => link._id === updatedLink._id);

      if (index !== -1) {
        updatedLink.likes = updatedLink.likes.filter(
          (user: User) => user !== usertoUnlike,
        ); // Assuming auth.user is the user who unliked the link
        updatedLink.postedBy = usertoUnlike;
        state.links[index] = updatedLink;
      }
    });
    builder.addCase(deleteLink.fulfilled, (state, action) => {
      const index = state.links.findIndex(l => l._id === action.payload._id);
      state.links.splice(index, 1);
    });
    builder.addCase(updateViewCount.fulfilled, (state, action) => {
      const index = state.links.findIndex(
        l => l._id === action.payload?.link?._id,
      );
      state.links[index] = {
        ...action.payload?.link,
        views: action.payload?.link.views + 1,
      };
    });
  },
});

export const selectLoading = (state: RootState) => state.link.loading;
export const selectLinks = (state: RootState) => state.link.links;
export const selectError = (state: RootState) => state.link.error;
export const {resetError, setLinksForUserProfile} = linkSlice.actions;
export default linkSlice.reducer;
// Thunk to reset error after a delay
export const resetErrorAsync = () => (dispatch: any) => {
  setTimeout(() => {
    dispatch(resetError());
  }, 3000);
};
