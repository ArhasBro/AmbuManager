import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  
  const users = await base44.asServiceRole.entities.User.list();
  const nathan = users.find(u => u.email === 'archenoul.nathan968@gmail.com');
  
  if (!nathan) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  const updated = await base44.asServiceRole.entities.User.update(nathan.id, {
    data: {
      ...nathan.data,
      business_role: 'ADMIN',
    }
  });

  return Response.json({ success: true, updated });
});