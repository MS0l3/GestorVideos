import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#5b3b8c',
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#6d4fa3',
    color: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#e6e9ef',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#3b2a5a',
  },

  buttonOutline: {
    borderWidth: 2,
    borderColor: '#e6e9ef',
    padding: 14,
    borderRadius: 14,
    marginTop: 15,
  },

  buttonOutlineText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },

  link: {
    color: '#ddd',
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  paragraph: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 30,
  },
});
