import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { getCategoryConfig } from '../../utils/reportConfig';
import { formatDate } from '../../utils/dateHelpers';

export default function FeaturedReportCard({ report, onPress }) {
    const categoryConfig = getCategoryConfig(report.category);

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(report)} activeOpacity={0.8}>
            <Image source={{ uri: report.imageUrl }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{report.title}</Text>

                <View style={styles.categoryContainer}>
                    <View style={[styles.categoryTag, { backgroundColor: categoryConfig.color }]}>
                        <MaterialIcons name={categoryConfig.icon} size={16} color={colors.textWhite} />
                        <Text style={styles.categoryText}>{report.category}</Text>
                    </View>
                </View>

                <View style={styles.dateContainer}>
                    <MaterialIcons name="schedule" size={16} color={colors.textGray} />
                    <Text style={styles.dateText}>{formatDate(report.date)}</Text>
                </View>

                {report.priority && (
                    <View style={styles.priorityContainer}>
                        <Text style={styles.priorityText}>{report.priority}</Text>
                    </View>
                )}

                <View style={styles.locationContainer}>
                    <MaterialIcons name="location-on" size={16} color={colors.textGray} />
                    <Text style={styles.locationText} numberOfLines={1}>{report.location}</Text>
                </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.likeButton}>
                        <MaterialIcons name="thumb-up" size={18} color={colors.success} />
                        <Text style={styles.likeText}>Me gusta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dislikeButton}>
                        <MaterialIcons name="thumb-down" size={18} color={colors.danger} />
                        <Text style={styles.dislikeText}>No me gusta</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <MaterialIcons name="comment" size={16} color={colors.textGray} />
                        <Text style={styles.statText}>{report.comments || 0} Comentarios</Text>
                    </View>

                    <View style={styles.statItem}>
                        <MaterialIcons name="favorite" size={16} color={colors.textGray} />
                        <Text style={styles.statText}>{report.interactions || 1} interacciones</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundWhite,
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 16,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 12,
        lineHeight: 24,
    },
    categoryContainer: {
        marginBottom: 8,
    },
    categoryTag: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textWhite,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 14,
        color: colors.textGray,
        marginLeft: 4,
    },
    priorityContainer: {
        backgroundColor: colors.backgroundLight,
        padding: 8,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: colors.warning,
    },
    priorityText: {
        fontSize: 13,
        color: colors.textDark,
        fontStyle: 'italic',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationText: {
        fontSize: 14,
        color: colors.textGray,
        marginLeft: 4,
        flex: 1,
    },
    actionContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.success + '15',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    likeText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.success,
    },
    dislikeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.danger + '15',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    dislikeText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.danger,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 12,
        color: colors.textGray,
    },
});