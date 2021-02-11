select *
from public.profile_user u
where email = ${email}
  and password = ${pass};