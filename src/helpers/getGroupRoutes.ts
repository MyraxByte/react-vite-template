import { group, listify } from "radash";
import { navigation } from '@/constants/navigations';

export default function getGroupRoutes(user: any) {
	const availableRoutes = navigation.filter((item) => {
		if (!item.access) return true;
		// if (!user) return false;

		return item.access(user?.role);
	});

	const routesByGroup = group(availableRoutes, (item) => item.group || 'personal');

	return listify(routesByGroup, (key, item) => ({
		groupName: key,
		routes: item!,
	}));
}