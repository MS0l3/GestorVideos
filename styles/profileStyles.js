import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5b3b8c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#fff',
  },

  editText: {
    color: '#ddd',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },

  email: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 25,
  },

  logoutButton: {
    backgroundColor: '#e6e9ef',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
  },

  logoutText: {
    color: '#3b2a5a',
    fontWeight: '600',
    fontSize: 16,
  },
});
