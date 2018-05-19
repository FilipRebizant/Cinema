<?php

namespace App\Repository;

use App\Entity\Screening;
use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

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


        return $this->getEntityManager()
            ->createQuery("
                SELECT s.start_date, DATE_FORMAT(s.start_date, '%d.%m') as day, m.title, s.hall
                FROM App\Entity\Screening s, App\Entity\Movie m
                WHERE s.id = m.id
                GROUP BY day
                
                ")
            ->getResult();
    }

}
