<?php

namespace App\Repository;

use App\Entity\Screening;
use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Intl\DateFormatter\DateFormat;

/**
 * @method Screening|null find($id, $lockMode = null, $lockVersion = null)
 * @method Screening|null findOneBy(array $criteria, array $orderBy = null)
 * @method Screening[]    findAll()
 * @method Screening[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScreeningRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Screening::class);
    }

//    /**
//     * @return Screening[] Returns an array of Screening objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Screening
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function getScreeningSchedule()
    {
        //Działa ale zwraca tylko 1 rekord
//         return $this->createQueryBuilder('s')
//             ->select('s')
//             ->addSelect('DATE_FORMAT(s.start_date, \'%d.%m\') as day')
//            ->innerJoin('s.movies', 'm')
//            ->addSelect('m')
////             ->groupBy('day')
//            ->getQuery()
//            ->getResult();


//        return $this->getEntityManager()
//            ->createQuery("
//                SELECT s.start_date, DATE_FORMAT(s.start_date, '%d.%m') as day, m.title, s.hall
//                FROM App\Entity\Screening s, App\Entity\Movie m
//                WHERE s.id = m.id
//                GROUP BY day
//
//                ")
//            ->getResult();

        $entityManager = $this->getEntityManager();
//        $sql = "SELECT u.id, u.name, a.id AS address_id, a.street, a.city " .
//            "FROM users u INNER JOIN address a ON u.address_id = a.id";
//
//        $rsm = new ResultSetMappingBuilder($entityManager);
//        $rsm->addRootEntityFromClassMetadata('MyProject\User', 'u');
//        $rsm->addJoinedEntityFromClassMetadata('MyProject\Address', 'a', 'u', 'address', array('id' => 'address_id'));

//        $rsm = new ResultSetMapping();
//// build rsm here
//
//        $query = $entityManager->createNativeQuery('SELECT price FROM screening', $rsm);
////        $query->setParameter(1, '');
//
//        $result = $query->getResult();

        $rsm = new ResultSetMapping;
        $rsm->addEntityResult(Screening::class, 's');
        $rsm->addFieldResult('s', 'id', 'id');
//        $rsm->addFieldResult('u', 'name', 'name');
//        $rsm->addMetaResult('u', 'address_id', 'address_id');

        $query = $this->_em->createNativeQuery('
            SELECT s.id, DATE_FORMAT(start_date, \'%d.%m\') as day
            FROM  screening s
            GROUP BY day
        ', $rsm);
//        $query->setParameter(1, 'romanb');

        $result = $query->getResult();


        return $result;
    }

}
