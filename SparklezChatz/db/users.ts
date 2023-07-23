import connection from './connection'

export async function getUsers(db = connection): Promise<any[]> {
  return await db('username').select('*')
}

export async function getUserByName(id: number, db = connection): Promise<any> {
  const [user] = await db('username').where({ name: 'Min' }).returning('*')
  return user
}
