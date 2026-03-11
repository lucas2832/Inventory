import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
});
export const index = async (params) => {
  return client.index(params);
};

export const update = async (params) => {
  return client.update(params);
};

export const search = async (params) => {
  return client.search(params);
};

export const remove = async (params) => {
  return client.delete(params);
};

export default client;