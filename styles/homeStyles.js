import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5b3b8c',
    paddingHorizontal: 16,
  },

  /* ---------- HEADER ---------- */
  header: {
    backgroundColor: '#e6e9ef',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  /* ---------- TITLE ---------- */
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },

  /* ---------- GRID ---------- */
  row: {
    justifyContent: 'space-between',
  },

  card: {
    width: CARD_WIDTH,
    marginBottom: 20,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 140,
    borderRadius: 14,
  },

  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },

  cardDate: {
    color: '#ccc',
    fontSize: 12,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 20,
  },
  listIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 20,
  },
    
});
